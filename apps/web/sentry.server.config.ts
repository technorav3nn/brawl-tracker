/* eslint-disable unicorn/no-zero-fractions */
import * as Sentry from "@sentry/nuxt";

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		// Tracing
		// We recommend adjusting this value in production, or using a tracesSampler for finer control.
		tracesSampleRate: 1.0, // Capture 100% of the transactions
		// Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
		tracePropagationTargets: ["localhost", /^https:\/\/brawl-tracker-mlxg.onrender.com/],
	});
}
