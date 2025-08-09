CREATE TABLE IF NOT EXISTS attendee (
    attendee_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS proctor (
    proctor_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS exams (
    exam_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subject VARCHAR(255),
    duration INT,
    proctor_id INT REFERENCES proctor(proctor_id)
);

CREATE TABLE IF NOT EXISTS questions (
    question_id SERIAL PRIMARY KEY,
    exam_id INT REFERENCES exams(exam_id),
    question TEXT,
    optionA VARCHAR(255),
    optionB VARCHAR(255),
    optionC VARCHAR(255),
    optionD VARCHAR(255),
    correct_ans VARCHAR(255)
);

ALTER TABLE exams
ADD COLUMN date DATE NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'upcoming';

CREATE TABLE exam_session (
    session_id SERIAL PRIMARY KEY,
    attendee_id INT REFERENCES attendee(attendee_id),
    exam_id INT REFERENCES exams(exam_id),
    starttime TIMESTAMP,
    endtime TIMESTAMP,
    score INT
);

-- Table: Answers
CREATE TABLE IF NOT EXISTS  answers (
    attendee_id INT REFERENCES attendee(attendee_id),
    question_id INT REFERENCES questions(question_id),
    selected_option VARCHAR(255),
    correct BOOLEAN
);

-- Table: Log
CREATE TABLE IF NOT EXISTS log (
    log_id SERIAL PRIMARY KEY,
    session_id INT REFERENCES exam_session(session_id),
    timestamp TIMESTAMP,
    event_type VARCHAR(255),
    remarks TEXT
);
