# @brawltracker/brawl-stars-api

Library for interacting with the Official Brawl Stars API.

- Easy to use
- Fully typed
- Supports all endpoints
- Works in any environment using [ofetch](https://unjs.io/packages/ofetch)

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
