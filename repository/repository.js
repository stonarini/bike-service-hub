module.exports = DB => {
	return {
		findAll: () => {
			return DB.find({}).toArray();
		},

		find: (req = {}) => {
			return DB.find(req).toArray();
		},

		findById: id => {
			return DB.findOne({ id }, { _id: 0 });
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
	};
};
