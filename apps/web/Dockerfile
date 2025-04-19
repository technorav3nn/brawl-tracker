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