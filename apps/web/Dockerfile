FROM node:22-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune @brawltracker/web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

# Install build-essential for native addons
RUN apk update
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .

# Declare arguments
ARG DATABASE_URL
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE
ARG EMAIL_KEY
ARG EMAIL_PASS
ARG CRYPT_SECRET
ARG RESEND_KEY
ARG RESEND_WEBHOOK_SECRET
ARG OWNER_EMAIL
ARG NEXT_PUBLIC_MIXPANEL_KEY
ARG CRON_SECRET

# Convert build-time variables to environment variables
ENV DATABASE_URL=$DATABASE_URL \
    SUPABASE_URL=$SUPABASE_URL \
    SUPABASE_SERVICE_ROLE=$SUPABASE_SERVICE_ROLE \
    EMAIL_KEY=$EMAIL_KEY \
    EMAIL_PASS=$EMAIL_PASS \
    CRYPT_SECRET=$CRYPT_SECRET \
    RESEND_KEY=$RESEND_KEY \
    RESEND_WEBHOOK_SECRET=$RESEND_WEBHOOK_SECRET \
    OWNER_EMAIL=$OWNER_EMAIL \
    NEXT_PUBLIC_MIXPANEL_KEY=$NEXT_PUBLIC_MIXPANEL_KEY \
    CRON_SECRET=$CRON_SECRET \
    NEXT_SHARP_PATH=/app/node_modules/sharp

ENV IS_DOCKER=1
COPY tsconfig.json .
RUN yarn turbo run build --filter=@brawltracker/web

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs

COPY --from=installer /app/apps/web/nuxt.config.ts .
COPY --from=installer /app/apps/web/package.json .

COPY --from=installer --chown=nodejs:nodejs /app/apps/web/.output/server ./server
COPY --from=installer --chown=nodejs:nodejs /app/apps/web/.output/public ./public
COPY --from=installer --chown=nodejs:nodejs /app/apps/web/.output/nitro.json .

CMD ["node", "server/index.mjs"]