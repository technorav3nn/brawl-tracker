# @brawltracker/brawl-stars-api

Brawl Stars official API wrapper

- TypeScript support
- Promise based
- Easy to use
- 100% coverage
- Uses [ofetch](https://unjs.io/packages/ofetch) for requests

## Installation

```bash
npm install @brawltracker/brawl-stars-api
# or
pnpm install @brawltracker/brawl-stars-api
# or
yarn add @brawltracker/brawl-stars-api
# or
bun install @brawltracker/brawl-stars-api
```

## Usage

```ts
import { BrawlStarsClient } from "@brawltracker/brawl-stars-api";

const client = new BrawlStarsClient("!! PUT YOUR TOKEN HERE !!");

const player = await client.getPlayer("YPJVGUR8L");
console.log(player.name);
```
