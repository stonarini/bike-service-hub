const request = require("supertest");
process.env.TEST = true;
const testApp = require("../app");

const bikesTest = require("./bikes-test");
const bikeTest = require("./bike-test");
const storesTest = require("./stores-test");
const storeTest = require("./store-test");
const { initMockDB, closeMockDB } = require("./mockDB");

const allCompleteBikes = require("./mockDB/completeBikes.json");
const newBike = JSON.stringify(require("./mockDB/newBike.json"));
const completeNewBike = JSON.stringify(require("./mockDB/completeNewBike.json"));
const allCompleteStores = require("./mockDB/completeStores.json");
const newStore = JSON.stringify(require("./mockDB/newStore.json"));
const completeNewStore = JSON.stringify(require("./mockDB/completeNewStore.json"));

const bikeConfig = {
	allCompleteModels: allCompleteBikes,
	newModel: newBike,
	completeNewModel: completeNewBike,
};

const storeConfig = {
	allCompleteModels: allCompleteStores,
	newModel: newStore,
	completeNewModel: completeNewStore,
};

beforeAll(async function () {
	let router = request(testApp);
	bikeConfig.router = router;
	storeConfig.router = router;
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

afterAll(async () => {
	await closeMockDB();
});
