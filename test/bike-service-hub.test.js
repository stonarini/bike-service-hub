const request = require("supertest");
process.env.TEST = true;
const testApp = require("../app");
const allBikes = JSON.stringify(require("./allBikes.json"));
const newBike = JSON.stringify(require("./newBike.json"));

const bikesTest = require("./bikes-test");
const bikeTest = require("./bike-test");

const config = {
	allBikes: JSON.parse(allBikes),
	newBike: newBike,
	router: undefined,
};

afterAll(async () => {
	await testApp.locals.DB.drop();
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});

	let driver = process.env.DRIVER == "mongo" ? "close" : "end";
	testApp.locals.DBclient[driver]();
});

beforeAll(async () => {
	config.router = request(testApp);
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
	await testApp.locals.DB.createMany(JSON.parse(allBikes));
});

describe("Bikes Routes", bikesTest.bind(config));

describe("Bike Routes", bikeTest.bind(config));
