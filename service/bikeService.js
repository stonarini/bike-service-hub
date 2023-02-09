const { bikesRepository } = require("../repository/bikesRepository");
const { rentRepository } = require("../repository/rentRepository");
const { storesRepository } = require("../repository/storesRepository");

async function rentBike(req) {
	let store = await storesRepository.findById(req.store_id);
	let bike = await bikesRepository.findById(req.bike_id);

	let optionalBike = store.bikes.filter(b => b._id.equals(bike._id));
	if (optionalBike.length > 0) {
		bike = optionalBike[0];
	} else {
		return null;
	}

	if (bike.availability instanceof Array) {
	} else {
		const startDate = new Date(req.startDate);
		const endDate = new Date(req.endDate);
		const startAvailableDate = new Date(bike.availability.from);
		const endAvailableDate = new Date(bike.availability.to);

		if (startDate > endDate || startDate < startAvailableDate || endDate > endAvailableDate) {
			return null;
		}

		const reserves = await rentRepository.getRentedBike(bike._id, store._id, startDate, endDate);

		const map = new Map();

		reserves.forEach(r => {
			let rStartDate = new Date(r.start_date);
			let rEndDate = new Date(r.end_date);
			while (rStartDate <= rEndDate) {
				map.set(rStartDate.toDateString(), map.has(rStartDate.toDateString()) ? map.get(rStartDate.toDateString()) + 1 : 1);
				rStartDate.setDate(rStartDate.getDate() + 1);
			}
		});

		let test = false;
		while (startDate <= endDate) {
			if (map.has(startDate.toDateString()) && map.get(startDate.toDateString()) >= bike.inventory) {
				test = true;
				break;
			}
			startDate.setDate(startDate.getDate() + 1);
		}
		if (test) {
			return null;
		}

		return bikesRepository.rent(req);
	}
}

module.exports = {
	bikesService: {
		rentBike,
	},
};
