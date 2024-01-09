import { join } from "node:path";
import { getRootData } from "@sapphire/pieces";
import { setup } from "@skyra/env-utilities";

export const mainFolder = getRootData().root;
export const rootFolder = join(mainFolder, "..");
const a = 1;
setup(join(rootFolder, ".env"));
