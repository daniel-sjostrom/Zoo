
CREATE TABLE IF NOT EXISTS zoo_table (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS ai_settings (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    model TEXT NOT NULL
);
