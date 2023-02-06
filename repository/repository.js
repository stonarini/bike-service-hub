const { ObjectId } = require("mongodb");
const { connection } = require("../db/database");

function repository(mainModel, relationModel) {
	return {
		findAll: function () {
			return this.find();
		},
		find: (obj = {}) => {
			return connection.DB.collection(mainModel)
				.aggregate([
					{ $match: obj },
					{ $lookup: { from: "bikes_stores", localField: "_id", foreignField: mainModel + "_id", as: "info" } },
					{ $lookup: { from: relationModel, localField: "info." + relationModel + "_id", foreignField: "_id", as: relationModel + "s" } },
					{
						$addFields: {
							[relationModel + "s"]: {
								$map: {
									input: "$" + relationModel + "s",
									in: {
										$mergeObjects: ["$$this", { $arrayElemAt: ["$info", { $indexOfArray: ["$info." + relationModel + "_id", "$$this._id"] }] }],
									},
								},
							},
						},
					},
					{ $project: { info: 0, [relationModel + "s._id"]: 0, [relationModel + "s.store_id"]: 0, [relationModel + "s.bike_id"]: 0 } },
				])
				.toArray();
		},
		findById: function (id) {
			return new Promise(async res => {
				res((await this.find({ _id: ObjectId(id) }))[0]);
			});
		},
		create: obj => {
			obj._id = ObjectId(obj._id);
			return connection.DB.collection(mainModel).insertOne(obj);
		},
		update: async (id, obj) => {
			return connection.DB.collection(mainModel).updateOne({ _id: ObjectId(id) }, { $set: obj });
		},
		delete: id => {
			return connection.DB.collection(mainModel).deleteOne({ _id: ObjectId(id) });
		},
		exist: id => {
			return Boolean(connection.DB.collection(mainModel).findOne({ _id: ObjectId(id) }));
		},
	};
}

module.exports = repository;
