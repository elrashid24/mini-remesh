CREATE TABLE CONVERSATIONS(
    conversation_id SERIAL PRIMARY KEY,
    title varchar(255),
    title_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE MESSAGES(
    message_id SERIAL PRIMARY KEY,
    conversation_id int,
    FOREIGN KEY(conversation_id) REFERENCES CONVERSATIONS,
    message_text varchar(1025),
    sent_date DATE NOT NULL DEFAULT CURRENT_DATE,
    sent_time TIMESTAMP
);

CREATE TABLE THOUGHTS(
    thought_id SERIAL PRIMARY KEY,
    message_id int,
    FOREIGN KEY(message_id) REFERENCES MESSAGES,
    thought_text varchar(1025),
    sent_date DATE NOT NULL DEFAULT CURRENT_DATE,
    sent_time TIMESTAMP
);