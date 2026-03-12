
-- FF TOURNEY PROFESSIONAL DATABASE SCHEMA
-- Compatible with MySQL (Hostinger Ready)

CREATE DATABASE IF NOT EXISTS ff_tourney;
USE ff_tourney;

-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ff_uid VARCHAR(20) UNIQUE NOT NULL,
    wallet_balance DECIMAL(10, 2) DEFAULT 0.00,
    referral_code VARCHAR(10) UNIQUE,
    referred_by VARCHAR(10),
    role ENUM('user', 'admin') DEFAULT 'user',
    profile_pic VARCHAR(255),
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tournaments Table
CREATE TABLE tournaments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    match_type ENUM('Full Map', '1v1', '2v2', '4v4'),
    map_name ENUM('Bermuda', 'Kalahari', 'Purgatory'),
    entry_fee DECIMAL(10, 2),
    per_kill_prize DECIMAL(10, 2),
    prize_pool DECIMAL(10, 2),
    slots INT,
    joined_slots INT DEFAULT 0,
    start_time DATETIME,
    room_id VARCHAR(50),
    room_password VARCHAR(50),
    status ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. App Settings Table
CREATE TABLE settings (
    id INT PRIMARY KEY,
    whatsapp_number VARCHAR(15),
    referral_reward DECIMAL(10, 2),
    min_withdrawal DECIMAL(10, 2),
    max_daily_withdrawal DECIMAL(10, 2),
    min_deposit DECIMAL(10, 2),
    qr_code_enabled BOOLEAN,
    gateway_enabled BOOLEAN DEFAULT TRUE,
    qr_code_image VARCHAR(255),
    payment_gateway_link VARCHAR(255),
    upi_id VARCHAR(100),
    deposit_enabled BOOLEAN DEFAULT TRUE
);

-- Initial Settings
INSERT INTO settings (id, whatsapp_number, referral_reward, min_withdrawal, max_daily_withdrawal, min_deposit, qr_code_enabled, gateway_enabled, upi_id, deposit_enabled) 
VALUES (1, '919876543210', 1.00, 30.00, 1000.00, 10.00, TRUE, TRUE, 'demo@upi', TRUE);
