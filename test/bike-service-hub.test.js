const request = require("supertest");
process.env.TEST = true;
const testApp = require("../app");

const bikesTest = require("./bikes-test");
const storesTest = require("./stores-test");
const bikeTest = require("./bike-test");
const { initMockDB, closeMockDB } = require("./mockDB");
const bikes = JSON.stringify(require("./mockDB/completeBikes.json"));
const stores = require("./mockDB/completeStores.json");
const newBike = JSON.stringify(require("./mockDB/newBike.json"));
const complNewBike = JSON.stringify(require("./mockDB/completeNewBike.json"));

const config = {
	allBikes: JSON.parse(bikes),
	newBike: newBike,
	completeNewBike: complNewBike,
	router: undefined,
	allStores: stores,
};

afterAll(async () => {
	await closeMockDB();
});

beforeAll(async () => {
	config.router = request(testApp);
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 2500);
	});
	await initMockDB();
});

describe("Bikes Routes", bikesTest.bind(config));

describe("Bike Routes", bikeTest.bind(config));

describe("Stores Routes", storesTest.bind(config));
