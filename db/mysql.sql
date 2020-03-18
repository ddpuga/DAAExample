CREATE DATABASE `daaexample`;

CREATE TABLE `daaexample`.`people` (
	`id` int(11) NOT NULL,
  	`name` varchar(50) NOT NULL,
  	`surname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `daaexample`.`users` (
	`login` varchar(100) NOT NULL,
	`password` varchar(64) NOT NULL,
	`role` varchar(10) NOT NULL,
	PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pets` (
	`id` int(11) NOT NULL,
  	`name` varchar(50) NOT NULL,
  	`ownerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE USER 'daa'@'localhost' IDENTIFIED WITH mysql_native_password BY 'daa';
GRANT ALL ON `daaexample`.* TO 'daa'@'localhost';
