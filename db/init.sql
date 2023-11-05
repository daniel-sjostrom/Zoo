CREATE TABLE IF NOT EXISTS goose_table (
	id serial PRIMARY KEY,
	username VARCHAR ( 50 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    question TEXT,
    answer TEXT,
    followup_question TEXT,
    followup_answer TEXT
);
