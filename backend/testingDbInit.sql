DELETE FROM `cs2300project`.`level_song`;
DELETE FROM `cs2300project`.`song`;
DELETE FROM `cs2300project`.`rating`;
DELETE FROM `cs2300project`.`level`;
DELETE FROM `cs2300project`.`user`;
DELETE FROM `cs2300project`.`game_account`;



INSERT INTO `cs2300project`.`game_account`
(`player_id`,
`stars`,
`moons`,
`demons`,
`username`)
VALUES
(5589398, 10, 10, 10, 'ExistingAccountUsername');

INSERT INTO `cs2300project`.`game_account`
(`player_id`,
`stars`,
`moons`,
`demons`,
`username`)
VALUES
(7103672, 3516, 25, 110, 'NEMO2510');

INSERT INTO `cs2300project`.`level`
(`level_id`,
`level_name`,
`difficulty`,
`distinction`,
`creator_id`,
`length`,
`wr_player_id`,
`wr_time`,
`avg_time`,
`is_platformer`)
VALUES
(93988001, "Transform", 10, "none", 5589398, 100, NULL, NULL, NULL, False);

INSERT INTO `cs2300project`.`level`
(`level_id`,
`level_name`,
`difficulty`,
`distinction`,
`creator_id`,
`length`,
`wr_player_id`,
`wr_time`,
`avg_time`,
`is_platformer`)
VALUES
(104043964, "3Depth", 9, "none", 7103672, 0, NULL, NULL, NULL, True);

INSERT INTO `cs2300project`.`user`
(`username`,
`email`,
`is_admin`,
`password`,
`game_account_id`)
VALUES
("admin", "admin@admin.com", 1, "adminpassword", NULL);

