CREATE TABLE IF NOT EXISTS attendee (
    attendee_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);