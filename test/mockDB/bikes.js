const { ObjectId } = require("mongodb");

module.exports = [
	{
		_id: ObjectId("000000000000000000000003"),
		name: "Scalpel-Si Carbon 4",
		brand: "Cannondale",
		year: "2020",
		category: "Crosscountry",
		weight: "26.2 lbs",
		frame: "Carbon",
		fork: "Cannondale Lefty Ocho",
		wheels: "Aluminum",
		price: "$4,500",
		brakes: "Hydraulic Disc",
		drivetrain: "1 x 12",
		suspension: "Full",
		wheelsize: ["29\\″"],
		groupset: ["GX Eagle", "NX Eagle"],
		travel: {
			front: "100mm",
			rear: "100mm",
		},
	},
	{
		_id: ObjectId("000000000000000000000004"),
		name: "SCARP MASTER",
		brand: "KTM",
		year: "2021",
		category: "Crosscountry",
		weight: "24.0 lbs",
		frame: "Carbon",
		fork: "Fox Factory Float 32",
		wheels: "Aluminum",
		price: "$4,825",
		brakes: "Hydraulic Disc",
		drivetrain: "1 x 12",
		suspension: "Full",
		wheelsize: ["29\\″"],
		groupset: ["XT"],
		travel: {
			front: "100mm",
			rear: "95mm",
		},
	},
];