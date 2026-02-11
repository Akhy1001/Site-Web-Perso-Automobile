-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS prestige_motors CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE prestige_motors;

-- CREATE TABLE FOR CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CREATE TABLE FOR CAR RESERVATIONS
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_model VARCHAR(255) NOT NULL,
    reservation_date VARCHAR(255) NOT NULL, -- Storing as string to match JS format or DATE if parsed
    email VARCHAR(255) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
