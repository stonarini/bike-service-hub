CREATE TABLE IF NOT EXISTS ${dbTable} (
	id varchar PRIMARY KEY NOT NULL,
	name varchar,
	brand varchar,
	category varchar,
	weight varchar,
	frame varchar,
	fork varchar,
	wheels varchar,
	price varchar,
	brakes varchar,
	drivetrain varchar,
	suspension varchar
);

CREATE TABLE IF NOT EXISTS ${dbTable}_WHEELSIZE (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	${dbTable}_id varchar,
	wheelsize varchar,
	CONSTRAINT fk_${dbTable}
		FOREIGN KEY (${dbTable}_id)
		REFERENCES ${dbTable}(id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ${dbTable}_GROUPSET (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	${dbTable}_id varchar,
	groupset varchar,
	CONSTRAINT fk_${dbTable}
		FOREIGN KEY (${dbTable}_id)
		REFERENCES ${dbTable}(id)
		ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ${dbTable}_TRAVEL (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	${dbTable}_id varchar UNIQUE,
	front varchar,
	rear varchar,
	CONSTRAINT fk_${dbTable}
		FOREIGN KEY (${dbTable}_id)
		REFERENCES ${dbTable}(id)
		ON DELETE CASCADE
);
