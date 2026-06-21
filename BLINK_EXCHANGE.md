# BLINK Exchange Monorepo

This document describes the initial fork of the SushiSwap monorepo for the BLINK Exchange project.

## Origin

- **Source repository:** [https://github.com/sushiswap/sushiswap](https://github.com/sushiswap/sushiswap)
- **Forked commit:** `88144007aeff42646b3036478734237e3321edc8`
- **Commit message:** `Revert "Feat: privy embedded wallets (email) (#2163)" (#2164)`
- **Fork date:** 2026-06-21

## What Was Rebranded

The following branding changes were applied from "Sushi" / "SushiSwap" to "BLINK" / "Blink Exchange":

- **Root package name:** `sushi` → `blink-exchange`
- **Frontend package name:** `web` → `@blink/exchange-web`
- **Root README.md:** Rewritten to describe the BLINK Exchange fork
- **Root AGENTS.md:** Updated to reference BLINK Exchange
- **Frontend AGENTS.md:** Updated filter references to `@blink/exchange-web`
- **Frontend metadata (`apps/web/src/app/layout.tsx`):**
  - Default page title: `Sushi 🍣` → `BLINK Exchange`
  - Title template: `%s | Sushi 🍣` → `%s | BLINK Exchange`
  - Description updated to BLINK Exchange description
  - OpenGraph alt text updated
- **Web app manifest (`apps/web/public/manifest.json`):**
  - Name: `Sushi` → `BLINK Exchange`
  - Short name: `Sushi` → `BLINK`
  - Description updated
- **Web app manifest (`apps/web/public/site.webmanifest`):**
  - Name: `Sushi` → `BLINK Exchange`
  - Short name: `Sushi` → `BLINK`
- **Root package scripts:** Updated `turbo --filter` references from `web` to `@blink/exchange-web`

### What Was NOT Changed

- Smart contract names, addresses, and ABI code remain unchanged.
- Internal workspace package names such as `@sushiswap/ui`, `@sushiswap/graph-client`, `@sushiswap/hooks`, etc. remain unchanged to preserve cross-package imports.
- External API endpoints, CDN URLs, and RPC configurations remain as-is from the SushiSwap base. These will be configured in later tasks for BLINK network data.

## Repository Structure

The monorepo is organized as a pnpm workspace with the following key locations:

### Applications (`apps/`)

| Package | Location | Description |
|---------|----------|-------------|
| `@blink/exchange-web` | `apps/web` | **Main frontend** — Next.js 16+ app with the DEX UI (swap, pools, cross-chain, staking, etc.) |
| `@sushiswap/storybook` | `apps/storybook` | Storybook for UI component development |

### Shared Packages (`packages/`)

| Package | Location | Description |
|---------|----------|-------------|
| `@sushiswap/ui` | `packages/ui` | Shared React UI component library |
| `@sushiswap/hooks` | `packages/hooks` | Shared React hooks |
| `@sushiswap/graph-client` | `packages/graph-client` | GraphQL / The Graph client and generated types |
| `@sushiswap/notifications` | `packages/notifications` | Toast/notification system used by the frontend |
| `@sushiswap/telemetry` | `packages/telemetry` | Observability / telemetry utilities |
| `sushiswap` | `packages/sushiswap` | Placeholder workspace package (the actual SDK logic is imported from the `sushi` npm package) |
| Stellar contract bindings | `packages/stellar/contract-bindings/*` | TypeScript bindings for Stellar smart contracts |

### Configuration (`config/`)

| Package | Location | Description |
|---------|----------|-------------|
| `eslint-config-sushi` | `config/eslint` | Shared ESLint configuration |
| `@sushiswap/tailwindcss-config` | `config/tailwindcss` | Shared Tailwind CSS configuration |
| `@sushiswap/typescript-config` | `config/typescript` | Shared TypeScript configurations |

### Tooling

- **Package manager:** [pnpm](https://pnpm.io/) `10.27.0`
- **Task runner:** [Turborepo](https://turbo.build/)
- **Node version:** `>= 20.x` (`.nvmrc` is set to `lts/iron`)
- **Formatter / linter:** Biome

## How to Run the Frontend Locally

1. **Install dependencies** (from the repo root):

   ```bash
   pnpm install
   ```

   > Note: `TRADING_VIEW_GH_READ_TOKEN` must be set to any non-empty value for the preinstall check to pass. The actual TradingView charting library is no longer fetched automatically (see Known Build Issues below).

2. **Configure environment** (from the repo root):

   ```bash
   cp apps/web/.env.example apps/web/.env
   ```

   Fill in required variables such as `DRPC_ID`, `NEXT_PUBLIC_DRPC_ID`, and any RPC/subgraph endpoints you want to use.

3. **Start the development server:**

   ```bash
   pnpm run web
   # or explicitly:
   pnpm exec turbo run dev --filter=@blink/exchange-web
   ```

4. **Build the frontend:**

   ```bash
   pnpm exec turbo run build --filter=@blink/exchange-web
   ```

## Known Build Issues

1. **TradingView charting library dependency (RESOLVED for install, pending for charts)**
   - The original `apps/web/package.json` had a `postinstall` script that cloned the private `tradingview/charting_library` repository using `TRADING_VIEW_GH_READ_TOKEN`.
   - Without a valid token, `pnpm install` fails during the frontend postinstall step.
   - **Workaround applied:** The `postinstall` script was removed from `apps/web/package.json` so that `pnpm install` completes successfully.
   - **Impact:** The frontend installs and can be built, but any page that depends on the TradingView charting library may fail at runtime or build time. This will be addressed in a follow-up task (Dockerize / configure real data).

2. **Build scripts ignored by pnpm**
   - Several native dependency build scripts are ignored by default (`@reown/appkit`, `@stellar/stellar-sdk`, `sharp`, `esbuild`, `bufferutil`, `utf-8-validate`, etc.).
   - If the frontend build fails with missing native modules, run:
     ```bash
     pnpm approve-builds
     ```
     and then rebuild.

3. **Environment variables required**
   - The frontend build expects environment variables from `apps/web/.env` (or `.env.local`).
   - A minimal `.env` can be created by copying `.env.example`. Some features may show errors until real RPC/subgraph endpoints are configured in task 438.

## Docker

A root-level `Dockerfile` and `docker-compose.yml` are provided for task 437.

- Build image: `docker build -t blink-exchange-frontend .`
- Build and start: `docker compose build && docker compose up -d`
- The frontend is exposed on port `3000`.
- Demo environment variables are set via Docker build args / compose environment.

## Build fixes applied for task 437

- Moved `pnpm.overrides`, `pnpm.patchedDependencies`, and `pnpm.onlyBuiltDependencies`
  from the ignored `pnpm` field in `package.json` to `pnpm-workspace.yaml` so pnpm 10
  actually applies them.
- Added `output: 'standalone'` to `apps/web/next.config.mjs` for a minimal Docker
  production image.
- Fixed a TypeScript error in
  `packages/graph-client/src/subgraphs/data-api/queries/trending-tokens/trending-tokens.ts`
  by casting `token.address` to `AddressFor<TChainId>` before passing it to
  `getIdFromChainIdAddress`.

## Live Data Configuration

The frontend is now configured to use real, public blockchain infrastructure instead of mock data.

### RPC endpoints

The wagmi/viem client reads per-chain RPC URLs from `NEXT_PUBLIC_RPC_*` environment variables. If a variable is unset, the app falls back to a free public RPC for that chain. The configured public RPCs are:

| Chain | Env var | Public RPC |
|-------|---------|------------|
| Ethereum | `NEXT_PUBLIC_RPC_ETHEREUM` | `https://ethereum-rpc.publicnode.com` |
| Polygon | `NEXT_PUBLIC_RPC_POLYGON` | `https://polygon-bor-rpc.publicnode.com` |
| Arbitrum | `NEXT_PUBLIC_RPC_ARBITRUM` | `https://arbitrum-rpc.publicnode.com` |
| BSC | `NEXT_PUBLIC_RPC_BSC` | `https://bsc-rpc.publicnode.com` |
| Avalanche | `NEXT_PUBLIC_RPC_AVALANCHE` | `https://avalanche-c-chain-rpc.publicnode.com` |
| Optimism | `NEXT_PUBLIC_RPC_OPTIMISM` | `https://optimism-rpc.publicnode.com` |
| Base | `NEXT_PUBLIC_RPC_BASE` | `https://base-rpc.publicnode.com` |
| Gnosis | `NEXT_PUBLIC_RPC_GNOSIS` | `https://gnosis-rpc.publicnode.com` |

Other chains fall back to the original dRPC URLs using `DRPC_ID` / `NEXT_PUBLIC_DRPC_ID`.

### Subgraph / data endpoints

Pool, token, price, and swap data are fetched from SushiSwap's live hosted services:

- Data API: `https://production.data-gcp.sushi.com` (`NEXT_PUBLIC_SUSHI_DATA_API_HOST`)
- Swap API: `https://api.sushi.com` (`NEXT_PUBLIC_API_BASE_URL`)
- The Graph key: `NEXT_PUBLIC_SUSHI_GRAPH_KEY`

These endpoints provide real token prices, real liquidity pools, real TVL, and real swap quotes.

### Docker environment

`docker-compose.yml` and the root `Dockerfile` pass all of the above variables as build args and runtime environment variables, so the container starts with live data enabled.

### Known working chains

- **Ethereum mainnet** — fully configured with a public RPC and live SushiSwap data.
- **Polygon** — fully configured with a public RPC and live SushiSwap data.
- **Arbitrum, BSC, Avalanche, Optimism, Base, Gnosis** — configured with public RPCs; data availability depends on the SushiSwap data API coverage for each chain.

Chains that do not have a `NEXT_PUBLIC_RPC_*` override continue to use dRPC and require a valid `DRPC_ID` to load live data.

## Next Steps

- **Task 439:** Deploy the Dockerized exchange to the StrukSwarm workspace server.
