const { ObjectId } = require("mongodb");
const { connection } = require("../db/database");
const repository = require("./repository");

module.exports = {
	storesRepository: {
		...repository("store", "bike"),

		addBike: (id, body) => {
			let { bike_id, ...info } = body;
			return connection.DB.collection("bikes_stores").updateOne({ store_id: ObjectId(id), bike_id: ObjectId(bike_id) }, { $set: info }, { upsert: true });
		},
	},
};
