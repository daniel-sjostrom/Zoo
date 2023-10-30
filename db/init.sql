CREATE TABLE IF NOT EXISTS goose_table (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL
);
