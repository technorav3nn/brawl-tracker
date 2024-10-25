/* eslint-disable unicorn/no-zero-fractions */
import * as Sentry from "@sentry/nuxt";

Sentry.init({
	// If set up, you can use your runtime config here
	// dsn: useRuntimeConfig().public.sentry.dsn,
	dsn: useRuntimeConfig().public.sentryDsn,
	integrations: [Sentry.replayIntegration()],
	// Tracing
	// We recommend adjusting this value in production, or using a tracesSampler for finer control.
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
	tracePropagationTargets: ["localhost", /^https:\/\/brawl-tracker-mlxg.onrender.com/],
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
