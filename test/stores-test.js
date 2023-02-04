module.exports = function () {
	test("/all gets all stores", async () => {
		let res = await this.router.get("/stores/all");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual(this.allStores);
	});

	test("/filter gets no match", async () => {
		let res = await this.router.post("/stores/filter").send({ name: "S'Escapada" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual([]);
	});

	test("/filter gets one match", async () => {
		let res = await this.router.post("/stores/filter").send({ name: "Velo Mallorca" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toHaveLength(1);
		expect(body).toEqual([this.allStores[0]]);
	});

	test("/filter gets more than one match", async () => {
		let res = await this.router.post("/stores/filter").send({ geoloc: "xy" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toHaveLength(2);
		expect(body).toEqual(this.allStores);
	});
};
