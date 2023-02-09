module.exports = function () {
	test("Rent is full", async () => {
		const startDate = new Date("2023-04-06T00:00:00.000Z");
		const endDate = new Date("2023-04-08T00:00:00.000Z");
		let res = await this.router.post("/bike/rent").send({ bike_id: this.bike_id, store_id: this.store_id, startDate, endDate });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(409);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "selected dates are unavailable" });
	});

	test("Rent is out of availability", async () => {
		const startDate = new Date("2023-03-06T00:00:00.000Z");
		const endDate = new Date("2023-03-08T00:00:00.000Z");
		let res = await this.router.post("/bike/rent").send({ bike_id: this.bike_id, store_id: this.store_id, startDate, endDate });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(409);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "selected dates are unavailable" });
	});

	test("Bike not in store for rent", async () => {
		const startDate = new Date("2023-04-03T00:00:00.000Z");
		const endDate = new Date("2023-04-05T00:00:00.000Z");
		let res = await this.router.post("/bike/rent").send({ bike_id: "000000000000000000000004", store_id: "000000000000000000000001", startDate, endDate });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(409);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "selected dates are unavailable" });
	});

	test("Rent rents a bike", async () => {
		const startDate = new Date("2023-04-03T00:00:00.000Z");
		const endDate = new Date("2023-04-05T00:00:00.000Z");
		let res = await this.router.post("/bike/rent").send({ bike_id: this.bike_id, store_id: this.store_id, startDate, endDate });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(201);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ message: "reserved" });
	});
};
