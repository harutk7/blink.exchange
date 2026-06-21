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

## Next Steps

- **Task 437:** Dockerize the BLINK Exchange (Dockerfiles + `docker-compose.yml`).
- **Task 438:** Configure real live blockchain data (public RPCs + Graph subgraphs).
- **Task 439:** Deploy the Dockerized exchange to the StrukSwarm workspace server.
