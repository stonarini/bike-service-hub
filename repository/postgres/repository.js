module.exports = {
	initRepository: (DB, dbTable) => {
		async function completeBikes(rows) {
			for (const row of rows) {
				row.wheelsize = (await DB.query(`SELECT wheelsize FROM ${dbTable}_WHEELSIZE WHERE ${dbTable}_id = '${row.id}'`)).rows.map(o => o.wheelsize);
				row.groupset = (await DB.query(`SELECT groupset FROM ${dbTable}_GROUPSET WHERE ${dbTable}_id = '${row.id}'`)).rows.map(o => o.groupset);
				row.travel = (await DB.query(`SELECT front, rear FROM ${dbTable}_TRAVEL WHERE ${dbTable}_id = '${row.id}'`)).rows[0];
			}
			return rows;
		}

		return {
			findAll: () => {
				return new Promise(async resolve => resolve(await completeBikes((await DB.query(`SELECT * FROM ${dbTable}`)).rows)));
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
				return new Promise(async resolve => resolve(await completeBikes((await DB.query(query)).rows)));
			},

			findById: id => {
				return new Promise(async resolve => resolve((await completeBikes((await DB.query(`SELECT * FROM ${dbTable} WHERE id = '${id}'`)).rows))[0]));
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
				let query = `UPDATE ${dbTable}`;
				let set = " SET ";

				let strings = Object.entries(obj).filter(([k, v]) => typeof v === "string");
				let array = Object.entries(obj).filter(([k, v]) => Array.isArray(v));
				let objects = Object.entries(obj).filter(([k, v]) => typeof v == "object" && !Array.isArray(v));

				Object.entries(strings).forEach(([i, [k, v]]) => {
					set += `${k} = '${v}', `;
				});
				set = set.replace(/, $/, ` WHERE id = '${id}'; `);
				query += set;

				Object.entries(array).forEach(([i, [k, v]]) => {
					query += `DELETE FROM ${dbTable}_${k.toUpperCase()} WHERE id = '${id}'; `;
					v.forEach(v => {
						query += `INSERT INTO ${dbTable}_${k.toUpperCase()} (${dbTable}_id, ${k}) VALUES ('${obj.id}', '${v}'); `;
					});
				});

				Object.entries(objects).forEach(([i, [k, v]]) => {
					query += `UPDATE ${dbTable}_${k.toUpperCase()}`;
					let set = ` SET `;

					Object.entries(v).forEach(([k, v]) => {
						set += `${k} = ${v}, `;
					});
					set = set.replace(/, $/, ` WHERE id = '${id}'; `);
					query += keys + values;
				});
				return new Promise(async resolve => DB.query(query).then(r => resolve({ modifiedCount: r.rowCount })));
			},

			delete: id => {
				return new Promise(async resolve => DB.query(`DELETE FROM ${dbTable} WHERE id = '${id}'`).then(r => resolve({ deletedCount: r.rowCount })));
			},

			createMany: async function (objs) {
				for (const obj of objs) {
					this.create(obj);
				}
			},

			drop: () => {
				DB.query(`DROP TABLE ${dbTable} CASCADE`);
				DB.query(`DROP TABLE ${dbTable}_travel CASCADE`);
				DB.query(`DROP TABLE ${dbTable}_groupset CASCADE`);
				DB.query(`DROP TABLE ${dbTable}_wheelsize CASCADE`);
			},
		};
	},
};
