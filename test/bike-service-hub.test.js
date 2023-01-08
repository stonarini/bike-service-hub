const request = require("supertest");
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
	await testApp.locals.DBclient.db("test-bikes").collection("catalog").drop();
	testApp.locals.DBclient.close();
});

beforeAll(async () => {
	process.env.TEST = true;
	config.router = request(testApp);
	await new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
	testApp.locals.DBclient.db("test-bikes").collection("catalog").insertMany(JSON.parse(allBikes));
});

describe("Bikes Routes", bikesTest.bind(config));

describe("Bike Routes", bikeTest.bind(config));
