const { connection, closeDB } = require("../../db/database");

const bikes = JSON.stringify(require("./bikes.json"));
const stores = JSON.stringify(require("./stores.json"));
const bikesStores = JSON.stringify(require("./bikes_stores.json"));

module.exports = {
	initMockDB: async () => {
		await connection.DB.collection("bikes").insertMany(JSON.parse(bikes));
		await connection.DB.collection("stores").insertMany(JSON.parse(stores));
		await connection.DB.collection("bikes_stores").insertMany(JSON.parse(bikesStores));
	},
	closeMockDB: async () => {
		await connection.DB.collection("bikes").drop();
		await connection.DB.collection("stores").drop();
		await connection.DB.collection("bikes_stores").drop();
		closeDB();
	},
};
