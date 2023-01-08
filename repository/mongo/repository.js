module.exports = {
	initRepository: DB => {
		return {
			findAll: () => {
				return DB.find({}, { projection: { _id: 0 } }).toArray();
			},

			find: (req = {}) => {
				return DB.find(req, { projection: { _id: 0 } }).toArray();
			},

			findById: id => {
				return DB.findOne({ id }, { projection: { _id: 0 } });
			},

			create: obj => {
				return DB.insertOne(obj);
			},

			update: (id, obj) => {
				return DB.updateOne({ id }, { $set: obj });
			},

			delete: id => {
				return DB.deleteOne({ id });
			},

			createMany: objs => {
				return DB.insertMany(objs);
			},

			drop: () => {
				DB.drop();
			},
		};
	},
};
