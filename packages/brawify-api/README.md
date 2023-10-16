Simple API wrapper for [Brawl API](https://brawlapi.com/).

No classes, no bs, just a simple wrapper.

## Installation

```bash
yarn add @brawltracker/brawlapi
# or
pnpm add @brawltracker/brawlapi
# or
npm install @brawltracker/brawlapi
```

## Usage

```js
import { brawlApi } from "@brawltracker/brawlapi";

brawlApi.getPlayer("2P9VQ8J9").then((player) => {
	console.log(player);
});
``;
```
