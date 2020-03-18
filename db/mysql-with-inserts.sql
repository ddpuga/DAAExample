CREATE DATABASE `daaexample`;

CREATE TABLE `daaexample`.`people` (
	`id` int(11) NOT NULL,
  	`name` varchar(50) NOT NULL,
  	`surname` varchar(100) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `daaexample`.`pets` (
	`id` int(11) NOT NULL,
  	`name` varchar(50) NOT NULL,
  	`ownerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `daaexample`.`users` (
	`login` varchar(100) NOT NULL,
	`password` varchar(64) NOT NULL,
	`role` varchar(10) NOT NULL,
	PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE USER 'daa'@'localhost' IDENTIFIED WITH mysql_native_password BY 'daa';
GRANT ALL ON `daaexample`.* TO 'daa'@'localhost';

INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Antón','Pérez');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Manuel','Martínez');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Laura','Reboredo');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Perico','Palotes');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Ana','María');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'María','Nuevo');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Alba','Fernández');
INSERT INTO `daaexample`.`people` (`id`,`name`,`surname`) VALUES (0,'Asunción','Jiménez');
INSERT INTO `daaexample`.`people` (`id`, `name`, `surname`) VALUES
(3, 'Laura', 'Reboredo'),
(5, 'Ana', 'Marí'),
(9, 'Daniel', 'Duque'),
(11, 'Jose', 'Do Rego'),
(15, 'Manolo', 'Escobar'),
(16, 'Leticia', 'Sabater');

INSERT INTO `daaexample`.`pets` (`id`, `name`, `ownerID`) VALUES
(15, 'Lassie', 3),
(32, 'Paco Pico', 3),
(33, 'Winnie', 3),
(34, 'Mickey', 3),
(35, 'Minnie', 3),
(36, 'Bola de nieve', 5),
(37, 'Scooby Doo', 5),
(38, 'Vodka', 5),
(39, 'Lagun', 5),
(40, 'Perro salchicha', 16);
-- The password for each user is its login suffixed with "pass". For example, user "admin" has the password "adminpass".
INSERT INTO `daaexample`.`users` (`login`,`password`,`role`)
VALUES ('admin', '713bfda78870bf9d1b261f565286f85e97ee614efe5f0faf7c34e7ca4f65baca','ADMIN');
INSERT INTO `daaexample`.`users` (`login`,`password`,`role`)
VALUES ('normal', '7bf24d6ca2242430343ab7e3efb89559a47784eea1123be989c1b2fb2ef66e83','USER');
