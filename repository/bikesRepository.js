const { ObjectId } = require("mongodb");
const { connection } = require("../db/database");

module.exports = {
	findAll: function () {
		return this.find();
	},
	find: (obj = {}) => {
		return connection.DB.collection("bikes")
			.aggregate([
				{ $match: obj },
				{ $lookup: { from: "bikes_stores", localField: "_id", foreignField: "bike_id", as: "info" } },
				{ $lookup: { from: "stores", localField: "info.store_id", foreignField: "_id", as: "stores" } },
				{
					$addFields: {
						stores: {
							$map: {
								input: "$stores",
								in: {
									$mergeObjects: [
										"$$this",
										{
											stock: {
												$getField: {
													field: "stock",
													input: { $arrayElemAt: ["$info", { $indexOfArray: ["$info.store_id", "$$this._id"] }] },
												},
											},
										},
									],
								},
							},
						},
					},
				},
				{ $project: { info: 0, "stores._id": 0 } },
			])
			.toArray();
	},
	findById: function (id) {
		return new Promise(async res => {
			res((await this.find({ _id: id }))[0]);
		});
	},
	create: obj => {
		return connection.DB.collection("bikes").insertOne(obj);
	},
	update: async (id, obj) => {
		return connection.DB.collection("bikes").updateOne({ _id: id }, { $set: obj });
	},
	delete: id => {
		return connection.DB.collection("bikes").deleteOne({ _id: id });
	},
	exist: id => {
		return Boolean(connection.DB.collection("bikes").findOne({ _id: ObjectId(id) }));
	},
};
