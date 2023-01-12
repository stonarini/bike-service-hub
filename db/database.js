require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@bike-hub.ufgzipi.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const schemas = require("../db/schema.json");

const connection = {
	DB: {},
};

async function initDB() {
	const dbName = process.env.TEST ? "test-" + process.env.DBNAME : process.env.DBNAME;
	await client.connect();
	const db = client.db(dbName);
	for (const key in schemas) {
		let value = schemas[key];
		if ((await db.collections()).filter(c => c.collectionName == key).length == 0) {
			await db.createCollection(key, { validator: value });
		}
	}
	connection.DB = client.db(dbName);
}

module.exports = { initDB, connection, closeDB: () => client.close() };
