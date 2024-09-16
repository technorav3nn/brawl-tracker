import pg from "pg";
const { Client } = pg;
const uri = "postgres://postgres:lolbas1510@deathblows.ddns.net:5432/brawl_tracker";

const client = new Client({ connectionString: uri, ssl: { rejectUnauthorized: false } });

void client.connect().then(() => console.log("Connected to database"));
