const request = require("supertest");
process.env.TEST = true;
const testApp = require("../app");

const bikesTest = require("./bikes-test");
const bikeTest = require("./bike-test");
const storesTest = require("./stores-test");
const storeTest = require("./store-test");
const rentTest = require("./rent-test");
const { initMockDB, closeMockDB } = require("./mockDB");

const allCompleteBikes = require("./mockDB/completeBikes.json");
const newBike = JSON.stringify(require("./mockDB/newBike"));
const completeNewBike = JSON.stringify(require("./mockDB/completeNewBike.json"));
const allCompleteStores = require("./mockDB/completeStores.json");
const newStore = JSON.stringify(require("./mockDB/newStore"));
const completeNewStore = JSON.stringify(require("./mockDB/completeNewStore.json"));

const config = {
	router: request(testApp),
};

const bikeConfig = Object.create(config, {
	allCompleteModels: { value: allCompleteBikes },
	newModel: { value: newBike },
	completeNewModel: { value: completeNewBike },
});

const storeConfig = Object.create(config, {
	allCompleteModels: { value: allCompleteStores },
	newModel: { value: newStore },
	completeNewModel: { value: completeNewStore },
});

const rentConfig = Object.create(config, {
	bike_id: { value: "000000000000000000000003" },
	store_id: { value: "000000000000000000000002" },
});

beforeAll(async function () {
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 2500);
	});
	await initMockDB();
});

describe("Bikes Routes", bikesTest.bind(bikeConfig));
describe("Bike Routes", bikeTest.bind(bikeConfig));
describe("Stores Routes", storesTest.bind(storeConfig));
describe("Store Routes", storeTest.bind(storeConfig));
describe("Rent Routes", rentTest.bind(rentConfig));

afterAll(async () => {
	await closeMockDB();
});
