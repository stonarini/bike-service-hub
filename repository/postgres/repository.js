module.exports = {
	initRepository: (DB, dbTable) => {
		return {
			findAll: () => {
				return new Promise(async resolve => resolve((await DB.query(`SELECT * FROM ${dbTable}`)).rows));
			},

			find: (req = {}) => {
				let query = `SELECT * FROM ${dbTable}`;
				if (Object.getOwnPropertyNames(req).length != 0) {
					query += ` WHERE `;
					let and = false;
					Object.entries(req).forEach(([k, v]) => {
						query += and ? " AND " : "";
						query += `${k} = '${v}'`;
						and = true;
					});
				}
				return new Promise(async resolve => resolve((await DB.query(query)).rows));
			},

			findById: id => {
				return new Promise(async resolve => resolve((await DB.query(`SELECT * FROM ${dbTable} WHERE id = '${id}'`)).rows[0]));
			},

			create: obj => {
				let query = `INSERT INTO ${dbTable}`;
				let keys = " (";
				let values = "VALUES (";

				let strings = Object.entries(obj).filter(([k, v]) => typeof v === "string");
				let array = Object.entries(obj).filter(([k, v]) => Array.isArray(v));
				let objects = Object.entries(obj).filter(([k, v]) => typeof v == "object" && !Array.isArray(v));

				Object.entries(strings).forEach(([i, [k, v]]) => {
					keys += `${k}, `;
					values += `'${v}', `;
				});
				keys = keys.replace(/, $/, ") ");
				values = values.replace(/, $/, "); ");
				query += keys + values;

				Object.entries(array).forEach(([i, [k, v]]) => {
					v.forEach(v => {
						query += `INSERT INTO ${dbTable}_${k.toUpperCase()} (${dbTable}_id, ${k}) VALUES ('${obj.id}', '${v}'); `;
					});
				});

				Object.entries(objects).forEach(([i, [k, v]]) => {
					query += `INSERT INTO ${dbTable}_${k.toUpperCase()}`;
					let keys = ` (${dbTable}_id, `;
					let values = `VALUES ('${obj.id}', `;

					Object.entries(v).forEach(([k, v]) => {
						keys += `${k}, `;
						values += `'${v}', `;
					});

					keys = keys.replace(/, $/, ") ");
					values = values.replace(/, $/, "); ");
					query += keys + values;
				});

				return new Promise(async resolve => DB.query(query).then(() => resolve({ insertedId: obj.id })));
			},

			update: (id, obj) => {
				return DB.updateOne({ id }, { $set: obj });
			},

			delete: id => {
				return DB.deleteOne({ id });
			},
		};
	},
};
