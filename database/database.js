const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@bike-hub.ufgzipi.mongodb.net/bikes?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const schema = require("./schema.json");

let DB;

async function initDB() {
	if (DB) return DB;
	await client.connect();
	const db = client.db("bikes");
	if ((await db.collections()).filter(c => c.collectionName == "catalog").length == 0) {
		await db.createCollection("catalog", { validator: schema });
	}
	DB = client;
	return DB;
}

module.exports = { initDB };
