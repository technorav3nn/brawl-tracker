import { acceptFriendRequest, getFriends, listProfiles, type Friend } from "@brawltracker/supercell-id-api";
import { getCdnUrlForAvatarId, highLowToId, idToTag } from "@brawltracker/supercell-id-api/browser";
import type { H3Event } from "h3";
import { createSessionClient } from "$server/utils/appwrite";
import { chunk, wait } from "$lib/utils/common";
import { getUser, upsertUserDoc } from "$server/db/users/actions";
import type { JSONSavedPlayer } from "$server/db/users/types";

export default defineEventHandler(async (event) => {
	const user = event.context.user;
	if (!user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const { databases } = createSessionClient(event);
	const { profile } = await getUser(user.$id, databases);

	if (!profile?.isConnected) {
		throw createError({ statusCode: 400, message: "SCID not connected" });
	}

	const { scid } = profile;
	const { scidAccountToken } = useRuntimeConfig(event);

	const sessionToken = await getCachedScidSessionToken(event, scidAccountToken);
	if (!sessionToken?.ok) {
		throw createError({ statusCode: 500, message: "Failed to retrieve session" });
	}

	const friends = await getFriends(sessionToken!.token);

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

	const friendsListProfiles = await getFriendsListProfiles(
		event,
		userFriends.data.friends.map((friend) => friend.scid)
	);
	if (!friendsListProfiles) {
		throw createError({ statusCode: 500, message: "Failed to retrieve friends profiles" });
	}

	const filteredFriends = friendsListProfiles.filter((friend) => friend.applicationAccountId && friend.playerName);

	const json = filteredFriends.map((friend) => {
		const { playerName, handle, scid } = friend;
		return {
			isScid: true,
			scidData: {
				avatar: (friend as any).imageURL ? (friend as any).imageURL : getCdnUrlForAvatarId(friend.avatarImage),
				name: playerName!,
				handle,
				scid,
			},
			name: playerName!,
			tag: idToTag(highLowToId(friend.applicationAccountId!).toString()),
		} satisfies JSONSavedPlayer;
	});

	try {
		await upsertUserDoc(user.$id, { savedPlayers: JSON.stringify(json) }, databases);
	} catch {
		throw createError({ statusCode: 500, message: "Failed to update user" });
	}
});

async function getFriendsListProfiles(event: H3Event, scids: string[]) {
	const { scidAccountToken } = useRuntimeConfig(useEvent());

	const sessionToken = await getCachedScidSessionToken(event, scidAccountToken);

	const chunks = chunk(scids, 50);

	const results = await Promise.all(
		chunks.map(async (chunk, index) => {
			if (index !== 0) await wait(1000);
			const result = await listProfiles(sessionToken!.token, chunk, "scids");
			if (!result.ok) throw new Error((result as any)?.message);
			return (result.data as any).profiles as Friend[];
		})
	);

	return results.flat();
}
