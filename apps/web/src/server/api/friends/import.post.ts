import { acceptFriendRequest, getFriends, listProfiles, type Friend } from "@brawltracker/supercell-id-api";
import { getCdnUrlForAvatarId, highLowToId, idToTag } from "@brawltracker/supercell-id-api/browser";
import type { H3Event } from "h3";
import { chunk, wait } from "$lib/utils/common";
import { user, type SavedPlayer } from "$server/database/schema";

export default defineEventHandler(async (event) => {
	if (!event.context.user) {
		throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
	}

	const { db } = useDrizzle();

	const foundUser = await db.query.user.findFirst({
		where: eq(user.id, event.context.user.id),
	});

	if (!foundUser?.scid) {
		throw createError({ statusCode: 400, message: "SCID not connected" });
	}

	const { scid } = foundUser;
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
			scidInfo: {
				avatar: (friend as any).imageURL ? (friend as any).imageURL : getCdnUrlForAvatarId(friend.avatarImage),
				handle,
				scid,
			},
			name: playerName!,
			tag: idToTag(highLowToId(friend.applicationAccountId!).toString()),
		} satisfies SavedPlayer;
	});

	try {
		await db
			.update(user)
			.set({ savedPlayers: [...(foundUser.savedPlayers ?? []), ...json] })
			.where(eq(user.id, event.context.user.id));
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
