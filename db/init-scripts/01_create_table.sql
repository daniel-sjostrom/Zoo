CREATE TABLE IF NOT EXISTS zoo_table (
    id serial PRIMARY KEY,
    username VARCHAR (50) NOT NULL
);

CREATE TABLE IF NOT EXISTS profile_ids (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL
);

