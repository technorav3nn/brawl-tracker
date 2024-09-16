import { verifyRequestOrigin, type Session, type User } from "lucia";
import { lucia } from "$server/auth";

export default defineEventHandler(async (event) => {
	if (event.method !== "GET") {
		const originHeader = getHeader(event, "Origin") ?? null;
		const hostHeader = getHeader(event, "Host") ?? null;
		if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
			return event.node.res.writeHead(403).end();
		}
	}

	const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
	if (!sessionId) {
		event.context.session = null;
		event.context.user = null;
		return;
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session?.fresh) {
		appendResponseHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}

	if (!session) {
		appendResponseHeader(event, "Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}

	// eslint-disable-next-line require-atomic-updates
	event.context.session = session;
	// eslint-disable-next-line require-atomic-updates
	event.context.user = user;
});

declare module "h3" {
	interface H3EventContext {
		user: User | null;
		session: Session | null;
	}
}
