const { ObjectId } = require("mongodb");

module.exports = [
	{
		store_id: ObjectId("000000000000000000000002"),
		bike_id: ObjectId("000000000000000000000003"),
		start_date: new Date("2023-04-01T00:00:00.000Z"),
		end_date: new Date("2023-04-03T00:00:00.000Z"),
		user: "some@user.com",
	},
	{
		store_id: ObjectId("000000000000000000000002"),
		bike_id: ObjectId("000000000000000000000003"),
		start_date: new Date("2023-04-02T00:00:00.000Z"),
		end_date: new Date("2023-04-06T00:00:00.000Z"),
		user: "some@user.com",
	},
	{
		store_id: ObjectId("000000000000000000000002"),
		bike_id: ObjectId("000000000000000000000003"),
		start_date: new Date("2023-04-05T00:00:00.000Z"),
		end_date: new Date("2023-04-07T00:00:00.000Z"),
		user: "some@user.com",
	},
	{
		store_id: ObjectId("000000000000000000000002"),
		bike_id: ObjectId("000000000000000000000003"),
		start_date: new Date("2023-04-06T00:00:00.000Z"),
		end_date: new Date("2023-04-08T00:00:00.000Z"),
		user: "some@user.com",
	},
];
