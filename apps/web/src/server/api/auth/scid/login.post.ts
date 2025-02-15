import { confirmLoginCode, getSessionToken, validateLoginCode } from "@brawltracker/supercell-id-api";
import { getCdnUrlForAvatarId } from "@brawltracker/supercell-id-api/browser";
import { captureException } from "@sentry/nuxt";
import { z } from "zod";
import { createSessionClient } from "$lib/appwrite";
import { upsertSupercellIdDoc } from "$server/db/users/actions";
import type { ScidConnection } from "$server/db/users/types";

const bodySchema = z.object({
	email: z.string().email(),
	code: z.string().length(6),
});

export default defineEventHandler(async (event) => {
	const result = await readValidatedBody(event, (body) => bodySchema.safeParse(body));
	if (!result.success) {
		throw result.error.issues;
	}

	const { email, code } = result.data;

	const profile = await validateLoginCode(email, code);
	if (!profile.ok) {
		throw createError({ statusCode: 400, statusMessage: "Invalid code", message: JSON.stringify(profile) });
	}

	// Now we know the user is valid, we can use confirmLoginCode now
	const confirmation = await confirmLoginCode(email, code);
	if (!confirmation) {
		throw createError({ statusCode: 400, statusMessage: "Invalid code", message: JSON.stringify(confirmation) });
	}

	const scidToken = confirmation.data.scidToken as string;

	// Proceed to initiate the session
	const { token: sessionToken } = await getSessionToken(scidToken);

	const doc: ScidConnection = {
		isConnected: true,
		tag: (profile as any).data.application.account as string,
		username: (profile as any).data.account.handle as string,
		scid: (profile as any).data.account.scid as string,
		avatar: getCdnUrlForAvatarId((profile as any).data.account.avatarImage as string),
		universalLink: "",
		qrCodeUrl: "",
		scidToken,
		sessionToken,
	};

	const { databases } = createSessionClient(event);

	try {
		await upsertSupercellIdDoc(event.context.user!.$id, doc, databases);
		await sendRedirect(event, "/");
	} catch (error) {
		captureException(error);
		throw createError({ statusCode: 500, statusMessage: "Failed to login" });
	}
});
