# db describe

```mysql
CREATE TABLE `follow` (
  `userId` int(11) NOT NULL,
  `holidayId` int(11) NOT NULL
);

CREATE TABLE `holidays` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL
);

CREATE TABLE `users` (
  `id` int(11) PRIMARY KEY NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` ENUM ('user', 'admin') DEFAULT "user"
);

ALTER TABLE `follow` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `follow` ADD FOREIGN KEY (`holidayId`) REFERENCES `holidays` (`id`);
```

```mysql
-- left join isfollowing on holiday
SELECT h.id, h.destination, h.description, h.start_date, h.end_date, h.price, h.image_name, CASE WHEN f.userId IS NOT NULL THEN 1 ELSE 0 END AS isFollowing FROM holidays h LEFT JOIN follow f ON h.id = f.holidayId AND f.userId = 9 ORDER BY `isFollowing` DESC

-- get all followed
SELECT h.id, h.destination, h.description, h.start_date, h.end_date, h.price, h.image_name,
       CASE WHEN f.userId IS NOT NULL THEN 1 ELSE 0 END AS isFollowing
FROM holidays h
LEFT JOIN follow f ON h.id = f.holidayId AND f.userId = 9;

-- left join isfollowing on holiday and left join follow co0unt
SELECT h.id, h.destination, h.description, h.start_date, h.end_date, h.price, h.image_name, CASE WHEN f.userId IS NOT NULL THEN 1 ELSE 0 END AS isFollowing, COUNT(f2.userId) AS followers FROM holidays h LEFT JOIN follow f ON h.id = f.holidayId AND f.userId = 9 LEFT JOIN follow f2 ON h.id = f2.holidayId GROUP BY h.id, h.destination, h.description, h.start_date, h.end_date, h.price, h.image_name, isFollowing ORDER BY isFollowing DESC;

```