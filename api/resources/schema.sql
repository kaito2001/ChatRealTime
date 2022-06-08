PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS conversation;
DROP TABLE IF EXISTS message;
DROP TABLE IF EXISTS member_of;

CREATE TABLE user (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT
);

CREATE TABLE conversation (
    guid INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    last_updated INTEGER
);

CREATE TABLE message (
    messid INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT NOT NULL,
    uid INTEGER NOT NULL,
    guid INTEGER,
    message TEXT NOT NULL,
    FOREIGN KEY(uid) 
        REFERENCES user(uid),
    FOREIGN KEY(guid) 
        REFERENCES conversation(guid)
);

CREATE TABLE member_of (
    uid INTEGER NOT NULL,
    guid INTEGER
);

