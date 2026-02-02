-- Encodage UTF-8 pour les caractères accentués
SET NAMES 'utf8mb4';

-- Création de la base
CREATE DATABASE IF NOT EXISTS ycyw_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
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

-- Session de chat pour Edouard (room 1)
INSERT INTO chat_sessions (id, start_time, end_time, status) VALUES
('1', '2026-02-02 09:00:00', NULL, 'OPEN');

-- Conversation d'exemple : Edouard et le support
INSERT INTO chat_messages (sender, content, timestamp, session_id) VALUES
('SUPPORT', 'Bonjour Edouard, comment puis-je vous aider aujourd''hui ?', '2026-02-02 09:00:00', '1'),
('USER', 'Bonjour, j''ai une question sur ma réservation.', '2026-02-02 09:01:15', '1'),
('SUPPORT', 'Bien sûr, de quelle réservation s''agit-il ?', '2026-02-02 09:01:45', '1'),
('USER', 'La réservation du 15 mars pour une Clio.', '2026-02-02 09:02:30', '1'),
('SUPPORT', 'Je consulte votre dossier. Un instant...', '2026-02-02 09:03:00', '1'),
('SUPPORT', 'Votre réservation est bien confirmée pour le 15 mars. Souhaitez-vous modifier quelque chose ?', '2026-02-02 09:04:20', '1'),
('USER', 'Non, c''était juste pour confirmer. Merci !', '2026-02-02 09:05:00', '1'),
('SUPPORT', 'Avec plaisir. N''hésitez pas si vous avez d''autres questions.', '2026-02-02 09:05:30', '1');