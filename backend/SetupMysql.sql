DROP DATABASE IF EXISTS cs2300project;

CREATE DATABASE cs2300project /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

DROP USER IF EXISTS cs2300backend@localhost;

CREATE USER cs2300backend@localhost IDENTIFIED BY 'cs2300password';

USE cs2300project;

GRANT DELETE, EXECUTE, INSERT, SELECT, SHOW VIEW, UPDATE ON cs2300project.* TO cs2300backend@localhost;

CREATE TABLE `game_account` (
  `player_id` int NOT NULL,
  `stars` int NOT NULL,
  `moons` int NOT NULL,
  `demons` int NOT NULL,
  `username` varchar(50) NOT NULL,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `is_admin` tinyint NOT NULL,
  `password` varchar(50) NOT NULL,
  `game_account_id` int DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `game_account_id` (`game_account_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`game_account_id`) REFERENCES `game_account` (`player_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `song` (
  `song_id` int NOT NULL,
  `song_name` varchar(50) DEFAULT NULL,
  `artist_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `level` (
  `level_id` int NOT NULL,
  `level_name` varchar(50) NOT NULL,
  `difficulty` int NOT NULL,
  `distinction` varchar(50) NOT NULL,
  `creator_id` int NOT NULL,
  `length` int DEFAULT NULL,
  `wr_player_id` int DEFAULT NULL,
  `wr_time` int DEFAULT NULL,
  `avg_time` int DEFAULT NULL,
  `is_platformer` int NOT NULL,
  PRIMARY KEY (`level_id`),
  KEY `creator_id` (`creator_id`),
  KEY `level_ibfk_2` (`wr_player_id`),
  CONSTRAINT `level_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `game_account` (`player_id`),
  CONSTRAINT `level_ibfk_2` FOREIGN KEY (`wr_player_id`) REFERENCES `game_account` (`player_id`),
  CONSTRAINT `level_chk_1` CHECK (((`difficulty` <= 10) and (`difficulty` >= 0)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `level_song` (
  `level_id` int NOT NULL,
  `song_id` int NOT NULL,
  PRIMARY KEY (`level_id`,`song_id`),
  KEY `song_id` (`song_id`),
  CONSTRAINT `level_song_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `level` (`level_id`),
  CONSTRAINT `level_song_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `song` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rating` (
  `level_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_time_rating` int DEFAULT NULL,
  `enjoyment` int DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  PRIMARY KEY (`level_id`,`username`),
  KEY `username` (`username`),
  CONSTRAINT `level_id_fk` FOREIGN KEY (`level_id`) REFERENCES `level` (`level_id`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;