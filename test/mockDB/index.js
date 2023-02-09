const { connection, closeDB } = require("../../db/database");

const bikes = require("./bikes");
const rents = require("./rents");
const stores = require("./stores");
const bikesStores = require("./bikes_stores");

module.exports = {
	initMockDB: async () => {
		await connection.DB.collection("bike").insertMany(bikes);
		await connection.DB.collection("store").insertMany(stores);
		await connection.DB.collection("bikes_stores").insertMany(bikesStores);
		await connection.DB.collection("rented_bikes").insertMany(rents);
	},
	closeMockDB: async () => {
		await connection.DB.collection("bike").drop();
		await connection.DB.collection("store").drop();
		await connection.DB.collection("bikes_stores").drop();
		await connection.DB.collection("rented_bikes").drop();
		closeDB();
	},
};
