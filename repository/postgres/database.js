require("dotenv").config();
const { Client } = require("pg");
const client = new Client({
	host: process.env.PG_HOST,
	user: process.env.DBUSER,
	password: process.env.PASSWORD,
	database: process.env.DBNAME.toLowerCase(),
});

const fs = require("fs");
const schema = fs.readFileSync("./repository/postgres/schema.sql", "utf8");
const { initRepository } = require("./repository");

async function initDB() {
	const dbTable = process.env.TEST ? "TEST_" + process.env.DBTABLE.toUpperCase() : process.env.DBTABLE.toUpperCase();
	await client.connect();
	let createTableQuery = schema.replaceAll("${dbTable}", dbTable);
	await client.query(createTableQuery);

	return { repository: initRepository(client, dbTable), client };
}

module.exports = { initDB };
