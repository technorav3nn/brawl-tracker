Simple API wrapper for [Brawl API](https://brawlapi.com/).

- No classes, very simple to use
- Written in TypeScript, with typings included
- Uses [ofetch](https://unjs.io/packages/ofetch) for requests
- Includes every API endpoint
- ESM and CJS support
- Unit tested

## Installation

```bash
yarn add @brawltracker/brawl-api
# or
pnpm add @brawltracker/brawl-api
# or
npm install @brawltracker/brawl-api
```

## Usage

```js
import { brawlApi } from "@brawltracker/brawl-api";

const shelly = await brawlApi.brawlers.getBrawler(16000000);
```

or

```js
import { brawlers } from "@brawltracker/brawl-api";

const shelly = await brawlers.getBrawler(16000000);
```

## Documentation

You can find the documentation [here](https://brawlapi.com).
Everything is exported from the `brawlApi` object, or you can import the specific endpoint you want to use
