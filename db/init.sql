CREATE TABLE IF NOT EXISTS super_duper_table (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS ai (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
);
