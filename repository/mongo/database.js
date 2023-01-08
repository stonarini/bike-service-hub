require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@bike-hub.ufgzipi.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const schema = require("./schema.json");
const { initRepository } = require("./repository");

async function initDB() {
	const dbName = process.env.TEST ? "test-" + process.env.DBNAME : process.env.DBNAME;
	const dbTable = process.env.DBTABLE;
	await client.connect();
	const db = client.db(dbName);
	if ((await db.collections()).filter(c => c.collectionName == dbTable).length == 0) {
		await db.createCollection(dbTable, { validator: schema });
	}
	return { repository: initRepository(client.db(dbName).collection(dbTable)), client };
}

module.exports = { initDB };
