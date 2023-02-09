const { connection } = require("../db/database");

function getRentedBike(bike_id, store_id, startDate, endDate) {
	return connection.DB.collection("rented_bikes")
		.find({
			store_id,
			bike_id,
			$or: [{ start_date: { $gte: startDate, $lte: endDate } }, { end_date: { $gte: startDate, $lte: endDate } }, { start_date: { $lte: startDate }, end_date: { $gte: endDate } }],
		})
		.toArray();
}

module.exports = {
	rentRepository: { getRentedBike },
};
