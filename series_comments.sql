CREATE DATABASE series_comments;

USE series_comments;

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment TEXT NOT NULL,
    episode INT NOT NULL,
    season INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);