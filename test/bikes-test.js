module.exports = function () {
	test("/catalog gets all bikes", async () => {
		let res = await this.router.get("/bikes/catalog");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual(this.allBikes);
	});

	test("/filter gets no match", async () => {
		let res = await this.router.post("/bikes/filter").send({ name: "Topstone Carbon 2 Lefty" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual([]);
	});

	test("/filter gets one match", async () => {
		let res = await this.router.post("/bikes/filter").send({ name: "Scalpel-Si Carbon 4" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toHaveLength(1);
		expect(body).toEqual([this.allBikes[0]]);
	});

	test("/filter gets more than one match", async () => {
		let res = await this.router.post("/bikes/filter").send({ frame: "Carbon" }).set("Content-Type", "application/json");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toHaveLength(2);
		expect(body).toEqual(this.allBikes);
	});
};
