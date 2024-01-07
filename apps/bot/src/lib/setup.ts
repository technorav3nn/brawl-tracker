import process from "node:process";
import { ApplicationCommandRegistries, RegisterBehavior } from "@sapphire/framework";
import "../config";
import "@sapphire/plugin-logger/register";

process.env.NODE_ENV ??= "development";

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
