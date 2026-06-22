# syntax=docker/dockerfile:1

# Base stage: Node.js + pnpm
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat python3 make g++ git
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Install pnpm globally (Docker runs as root, so this works)
RUN npm install -g pnpm@10.27.0
# Allow lifecycle/build scripts for dependencies that need native compilation
RUN pnpm config set onlyBuiltDependencies true

# Dependencies stage
FROM base AS deps
WORKDIR /app
# Copy workspace manifests and patches first for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
COPY config ./config
COPY packages ./packages
COPY apps ./apps
# Install dependencies. The preinstall script only checks for the token env var;
# --ignore-scripts skips the root postinstall validator to keep the image lean.
RUN TRADING_VIEW_GH_READ_TOKEN=dummy pnpm install --ignore-scripts
# Re-run build scripts for native dependencies (sharp, esbuild, bufferutil, etc.)
RUN pnpm rebuild

# Builder stage
FROM deps AS builder
WORKDIR /app
# Build-time environment variables (demo values)
ARG NEXT_TELEMETRY_DISABLED=1
ARG DRPC_ID=demo
ARG NEXT_PUBLIC_DRPC_ID=demo
ARG NEXT_PUBLIC_SUSHI_GRAPH_KEY=be60450c5c375eaa36fa6b1540047434
ARG NEXT_PUBLIC_SUSHI_DATA_API_HOST=https://production.data-gcp.sushi.com
ARG NEXT_PUBLIC_API_BASE_URL=https://api.sushi.com
ARG EDGE_CONFIG=dummy
# Public RPC endpoints used by apps/web/src/lib/wagmi/config/viem.ts
ARG NEXT_PUBLIC_RPC_ETHEREUM=https://ethereum-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_POLYGON=https://polygon-bor-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_ARBITRUM=https://arbitrum-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_BSC=https://bsc-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_AVALANCHE=https://avalanche-c-chain-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_OPTIMISM=https://optimism-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_BASE=https://base-rpc.publicnode.com
ARG NEXT_PUBLIC_RPC_GNOSIS=https://gnosis-rpc.publicnode.com
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED
ENV DRPC_ID=$DRPC_ID
ENV NEXT_PUBLIC_DRPC_ID=$NEXT_PUBLIC_DRPC_ID
ENV NEXT_PUBLIC_SUSHI_GRAPH_KEY=$NEXT_PUBLIC_SUSHI_GRAPH_KEY
ENV NEXT_PUBLIC_SUSHI_DATA_API_HOST=$NEXT_PUBLIC_SUSHI_DATA_API_HOST
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV EDGE_CONFIG=$EDGE_CONFIG
ENV NEXT_PUBLIC_RPC_ETHEREUM=$NEXT_PUBLIC_RPC_ETHEREUM
ENV NEXT_PUBLIC_RPC_POLYGON=$NEXT_PUBLIC_RPC_POLYGON
ENV NEXT_PUBLIC_RPC_ARBITRUM=$NEXT_PUBLIC_RPC_ARBITRUM
ENV NEXT_PUBLIC_RPC_BSC=$NEXT_PUBLIC_RPC_BSC
ENV NEXT_PUBLIC_RPC_AVALANCHE=$NEXT_PUBLIC_RPC_AVALANCHE
ENV NEXT_PUBLIC_RPC_OPTIMISM=$NEXT_PUBLIC_RPC_OPTIMISM
ENV NEXT_PUBLIC_RPC_BASE=$NEXT_PUBLIC_RPC_BASE
ENV NEXT_PUBLIC_RPC_GNOSIS=$NEXT_PUBLIC_RPC_GNOSIS
ENV NODE_ENV=production
# Build only the frontend package; Turbo will build its workspace dependencies.
RUN pnpm exec turbo run build --filter=@blink/exchange-web

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Copy the standalone Next.js output, static assets, and public files
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
