const { connection } = require("../db/database");
const repository = require("./repository");

module.exports = {
	bikesRepository: {
		...repository("bike", "store"),

		rent: obj => {
			connection.DB.collection("rented_bikes").insertOne(obj);
		},
	},
};
