module.exports = function () {
	let id = JSON.parse(this.newModel)._id;

	test("POST errors if the new store is not correct", async () => {
		let res = await this.router.post("/store/new").send({ store: "Wrong Store" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(401);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "invalid request body" });
	});

	test("POST creates a new store", async () => {
		let res = await this.router.post("/store/new").send(JSON.parse(this.newModel));
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(201);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ created: id });
	});

	test("GET gets the correct store", async () => {
		let res = await this.router.get("/store/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual(JSON.parse(this.completeNewModel).model);
	});

	test("PUT does not find the store", async () => {
		let res = await this.router.put("/store/999999").send({ name: "Bikers Menorca" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(401);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "invalid id" });
	});

	test("PUT errors if the request is not correct", async () => {
		let res = await this.router.put("/store/" + id).send({ location: "S'Arenal" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(401);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "invalid request body" });
	});

	test("PUT updates a store", async () => {
		let res = await this.router.put("/store/" + id).send({ geoloc: "yx" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ updated: id });
	});

	test("GET finds the updated store", async () => {
		let res = await this.router.get("/store/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		let updatedStore = JSON.parse(this.completeNewModel).model;
		updatedStore.geoloc = "yx";
		expect(body).toEqual(updatedStore);
	});

	test("Assign a bike to a store", async () => {
		let res = await this.router.put("/store/" + id + "/addBike").send({ bike_id: "000000000000000000000004", inventory: "3" });
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(201);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ modified: id });
	});

	test("GET find the store with the bike", async () => {
		let res = await this.router.get("/store/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		let updatedStore = JSON.parse(this.completeNewModel).modelWithBike;
		updatedStore.geoloc = "yx";
		expect(body).toEqual(updatedStore);
	});

	test("DELETE does not find the store", async () => {
		let res = await this.router.delete("/store/999999");
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(401);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "invalid id" });
	});

	test("DELETE deletes the store", async () => {
		let res = await this.router.delete("/store/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(200);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ deleted: id });
	});

	test("GET does not find the deleted store", async () => {
		let res = await this.router.get("/store/" + id);
		const body = JSON.parse(res.text);
		expect(res.statusCode).toEqual(404);
		expect(res.get("Content-Type")).toEqual(expect.stringMatching("/json"));
		expect(body).toEqual({ error: "not found" });
	});
};
