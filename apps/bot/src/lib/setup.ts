import "../config";
import process from "node:process";
import { container } from "@skyra/http-framework";
import { Logger } from "@skyra/logger";

process.env.NODE_ENV ??= "development";

container.logger = new Logger({ level: Logger.Level.Debug });

declare module "@sapphire/pieces" {
	export interface Container {
		logger: Logger;
	}
}
