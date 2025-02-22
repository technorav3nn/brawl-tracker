import { acceptFriendRequest, getFriends } from "@brawltracker/supercell-id-api";
import { createSessionClient } from "$lib/appwrite";
import { getUser, upsertUserDoc } from "$server/db/users/actions";
import type { JSONSavedPlayer } from "$server/db/users/types";

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	if (!user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const { databases } = createSessionClient(event);
	const { scidConnections } = await getUser(user.$id, databases);

	if (!scidConnections?.isConnected) {
		throw createError({ statusCode: 400, message: "SCID not connected" });
	}

	const { scid } = scidConnections;
	const { scidAccountToken } = useRuntimeConfig(event);

	const sessionToken = await getCachedScidSessionToken(scidAccountToken);
	if (!sessionToken?.ok) {
		throw createError({ statusCode: 500, message: "Failed to retrieve session" });
	}

	const friends = await getFriends(sessionToken!.token);
	console.log(friends);
	if (!friends.ok) {
		throw createError({ statusCode: 500, message: "Failed to retrieve friends" });
	}

	const {
		data: { friends: friendsList },
	} = friends;

	let friend = friendsList.find((friend) => friend.relationship.status === "REQUEST_RECEIVED" && friend.scid === scid);
	if (!friend) {
		const alreadyAdded = friendsList.find((friend) => friend.scid === scid);
		if (alreadyAdded) {
			console.log("Friends: was already added: ", scid);
			friend = alreadyAdded;
		} else {
			throw createError({ statusCode: 400, message: "No friend request found" });
		}
	}

	const status = await acceptFriendRequest(sessionToken.token, [friend!.scid]);
	if (!status.ok) {
		throw createError({ statusCode: 500, message: "Failed to accept friend request" });
	}

	// We can now access the users friends because we added them
	const userFriends = await getFriends(sessionToken.token, scid!);
	if (!userFriends.ok) {
		throw createError({ statusCode: 500, message: "Failed to retrieve friends" });
	}

	const json = userFriends.data.friends.map((friend) => {
		const { avatarImage, name, handle, scid } = friend;
		return {
			isScid: true,
			scidData: {
				avatarImage,
				name,
				handle,
				scid,
			},
			name,
		} satisfies JSONSavedPlayer;
	});

	try {
		await upsertUserDoc(user.$id, { savedPlayers: JSON.stringify(json) }, databases);
	} catch {
		throw createError({ statusCode: 500, message: "Failed to update user" });
	}
});
