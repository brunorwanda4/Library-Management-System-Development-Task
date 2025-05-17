DROP DATABASE IF EXISTS Library_DB;
CREATE DATABASE Library_DB;

USE Library_DB;

CREATE TABLE Users (
 userId INT AUTO_INCREMENT PRIMARY KEY,
 userName VARCHAR(255),
 password VARCHAR(255),
 role ENUM('librarian','assistant')
);

CREATE TABLE Memebers (
memberId INT AUTO_INCREMENT PRIMARY KEY,
 firstName VARCHAR(100),
 lastName VARCHAR(100),
 email VARCHAR(255),
 phone VARCHAR(20)
);

CREATE TABLE Media (
 mediaId INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(255),
 type ENUM('Book','DVD','Magazine'),
 author VARCHAR(255),
 publisher VARCHAR(255),
 year YEAR,
 availableCopies INT
);

CREATE TABLE Loans (
 loanId INT AUTO_INCREMENT PRIMARY KEY,
 mediaId INT NOT NULL,
 memberId INT NOT NULL,
 loanDate DATE,
 dueDate DATE,
 returnDate DATE NULL,
 FOREIGN KEY (mediaId) REFERENCES Media(mediaId),
 FOREIGN KEY (memberId) REFERENCES Members(memberId)
)