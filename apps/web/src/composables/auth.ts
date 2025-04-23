import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { useServerAuth } from "$server/utils/auth";

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<ReturnType<typeof useServerAuth>>()],
});
