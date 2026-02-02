-- Création de la base
CREATE DATABASE IF NOT EXISTS ycyw_db;
USE ycyw_db;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    license_number VARCHAR(50),
    user_id BIGINT NOT NULL UNIQUE,
    CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id VARCHAR(36) PRIMARY KEY,
    start_time DATETIME,
    end_time DATETIME,
    status VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    session_id VARCHAR(36),
    CONSTRAINT fk_message_session FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

INSERT INTO users (id, email, password_hash) VALUES
(1, 'edouard@ycyw.com', '$2a$10$placeholder_edouard'),
(3, 'adele@ycyw.com', '$2a$10$placeholder_adele');

INSERT INTO customer_profiles (first_name, last_name, license_number, user_id) VALUES
('Edouard', 'Dupont', NULL, 1),
('Adele', 'Martin', NULL, 3);