const { connection } = require("../db/database");
const repository = require("./repository");

module.exports = {
	storesRepository: {
		...repository("store", "bike"),

		addBike: (id, info) => {
			return connection.DB.collection("bikes_stores").updateOne({ store_id: id, bike_id: info.bike_id }, info, { upsert: true });
		},
	},
};
