# BLINK Exchange Monorepo

A decentralized exchange (DEX) for the BLINK network, forked from the SushiSwap monorepo.

This repository contains the code for the BLINK Exchange interface and supporting packages: frontend (Next.js), smart contracts, subgraph client, SDK, hooks, UI components, and configuration packages.

## Origin

- **Forked from:** [SushiSwap](https://github.com/sushiswap/sushiswap)
- **Source commit:** `88144007aeff42646b3036478734237e3321edc8`
- **Branding:** Rebranded from "Sushi" / "SushiSwap" to "BLINK" / "Blink Exchange" for the BLINK blockchain network.

## Getting Started

This monorepo uses [pnpm](https://pnpm.io/) as its package manager and requires Node.js >= 20.x.

### Install

```bash
pnpm install
```

### Configure the environment

Copy `apps/web/.env.example` to `apps/web/.env` and fill in non-optional variables. You can skip variables for parts of the app you are not working on.

### Dev

```bash
pnpm exec turbo run dev --filter=@blink/exchange-web
```

or use the shorthand:

```bash
pnpm run web
```

### Build

```bash
pnpm exec turbo run build --filter=@blink/exchange-web
```

### Clean (for getting the repo into a clean state)

```bash
pnpm run clean
```

## Repository Structure

See [`BLINK_EXCHANGE.md`](./BLINK_EXCHANGE.md) for a detailed overview of the packages and their locations.

## Disclaimer

_This code is being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts and code. There can be no assurance it will work as intended, and users may experience delays, failures, errors, omissions or loss of transmitted information. In addition, using this code should be conducted in accordance with applicable law. Nothing in this repo should be construed as investment advice or legal advice for any particular facts or circumstances and is not meant to replace competent counsel. It is strongly advised for you to contact a reputable attorney in your jurisdiction for any questions or concerns with respect thereto. BLINK Exchange is not liable for any use of the foregoing and users should proceed with caution and use at their own risk._
