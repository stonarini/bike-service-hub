require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@bike-hub.ufgzipi.mongodb.net/bikes?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const schema = require("./schema.json");
const { initRepository } = require("./repository");

let DB;

async function initDB() {
	const dbName = process.env.TEST ? "test-" + process.env.DBNAME : process.env.DBNAME;
	await client.connect();
	const db = client.db(dbName);
	if ((await db.collections()).filter(c => c.collectionName == "catalog").length == 0) {
		await db.createCollection("catalog", { validator: schema });
	}
	return { repository: initRepository(client.db(dbName).collection("catalog")), client };
}

module.exports = { initDB };
