const request = require("supertest");
const testApp = require("../app");
const db = JSON.stringify(require("./db.json"));

describe("Bikes Routes", () => {
	let router;

	let allBikes = JSON.parse(db);

	afterAll(async () => {
		await testApp.locals.DBclient.db("test-bikes").collection("catalog").drop();
		testApp.locals.DBclient.close();
	});

	beforeAll(async () => {
		process.env.TEST = true;
		router = request(testApp);
		await new Promise(resolve => {
			setTimeout(() => {
				resolve(true);
			}, 1000);
		});
		testApp.locals.DBclient.db("test-bikes").collection("catalog").insertMany(JSON.parse(db));
	});

	test("/catalog gets all bikes", async () => {
		let res = await router.get("/bikes/catalog");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual(allBikes);
	});

	test("/filter gets no match", async () => {
		let res = await router.post("/bikes/filter").send({ name: "Topstone Carbon 2 Lefty" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual([]);
	});

	test("/filter gets one match", async () => {
		let res = await router.post("/bikes/filter").send({ name: "SISKIU T8" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body.length).toEqual(1);
		expect(body).toEqual([allBikes[0]]);
	});

	test("/filter gets more than one match", async () => {
		let res = await router.post("/bikes/filter").send({ frame: "Aluminum" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body.length).toEqual(2);
		expect(body).toEqual(allBikes);
	});
});
