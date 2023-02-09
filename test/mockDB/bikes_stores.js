const { ObjectId } = require("mongodb");

module.exports = [
	{
		bike_id: ObjectId("000000000000000000000003"),
		store_id: ObjectId("000000000000000000000001"),
		inventory: "2",
	},
	{
		bike_id: ObjectId("000000000000000000000003"),
		store_id: ObjectId("000000000000000000000002"),
		inventory: "3",
		availability: {
			from: new Date("2023-04-01T00:00:00.000Z"),
			to: new Date("2023-04-10T00:00:00.000Z"),
		},
	},
	{
		bike_id: ObjectId("000000000000000000000004"),
		store_id: ObjectId("000000000000000000000002"),
		inventory: "2",
	},
];
