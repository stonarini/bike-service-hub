module.exports = function () {
	let id = JSON.parse(this.newBike).id;

	test("POST errors if the new bike is not correct", async () => {
		let res = await this.router.post("/bike/new").send({ bike: "Wrong Bike" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(401);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "invalid request body" });
	});

	test("POST creates a new bike", async () => {
		let res = await this.router.post("/bike/new").send(JSON.parse(this.newBike));
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(201);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ created: id });
	});

	test("GET gets the correct bike", async () => {
		let res = await this.router.get("/bike/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual(JSON.parse(this.newBike));
	});

	test("PUT does not find the bike", async () => {
		let res = await this.router.put("/bike/999999").send({ frame: "Carbon" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(404);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "not found" });
	});

	test("PUT errors if the request is not correct", async () => {
		let res = await this.router.put("/bike/" + id).send({ pedals: "Shimano PD-M520" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(401);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "invalid request body" });
	});

	test("PUT updates a bike", async () => {
		let res = await this.router.put("/bike/" + id).send({ frame: "Carbon" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ updated: id });
	});

	test("GET finds the updated bike", async () => {
		let res = await this.router.get("/bike/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		let updatedBike = JSON.parse(this.newBike);
		updatedBike.frame = "Carbon";
		expect(body).toEqual(updatedBike);
	});

	test("DELETE does not find the bike", async () => {
		let res = await this.router.delete("/bike/999999");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(404);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "not found" });
	});

	test("DELETE deletes the bike", async () => {
		let res = await this.router.delete("/bike/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ deleted: id });
	});

	test("GET does not find the deleted bike", async () => {
		let res = await this.router.get("/bike/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(404);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "not found" });
	});
};
