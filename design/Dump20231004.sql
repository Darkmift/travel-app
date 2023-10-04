CREATE DATABASE  IF NOT EXISTS `holiday` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `holiday`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: holiday
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `holidays`
--

DROP TABLE IF EXISTS `holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `holidays` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `price` decimal(10,2) NOT NULL,
  `image_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_b8732ca4e796bd2198b2359d65` (`destination`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `holidays`
--

LOCK TABLES `holidays` WRITE;
/*!40000 ALTER TABLE `holidays` DISABLE KEYS */;
INSERT INTO `holidays` VALUES (1,'Japan','A trip to explore the beautiful landscapes and rich culture of Japan.','2024-04-01 03:00:00','2024-04-15 03:00:00',2000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(2,'France','Discover the romantic ambiance of France.','2024-06-05 00:00:00','2024-06-15 00:00:00',3000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(3,'Vietnam','Experience the unique culture of Vietnam.','2024-07-01 00:00:00','2024-07-11 00:00:00',3500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(4,'Australia','Uncover the natural beauty of Australia.','2024-08-03 00:00:00','2024-08-13 00:00:00',4000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(5,'Canada','Delve into the pristine wilderness of Canada.','2024-09-02 00:00:00','2024-09-12 00:00:00',2500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(6,'Spain','Immerse in the vibrant traditions of Spain.','2024-10-01 00:00:00','2024-10-11 00:00:00',4200.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(7,'Brazil','Experience the lively atmosphere of Brazil.','2024-11-05 00:00:00','2024-11-15 00:00:00',2800.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(8,'India','Explore the diverse heritage of India.','2024-12-01 00:00:00','2024-12-11 00:00:00',3200.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(9,'Mexico','Discover the ancient history of Mexico.','2025-01-03 00:00:00','2025-01-13 00:00:00',2900.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(10,'Germany','Delve into the rich culture of Germany.','2025-02-01 00:00:00','2025-02-11 00:00:00',4600.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(11,'China','Experience the ancient and modern wonders of China.','2025-03-01 00:00:00','2025-03-11 00:00:00',3300.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(12,'Russia','Explore the vast landscapes of Russia.','2025-04-01 00:00:00','2025-04-11 00:00:00',3100.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(13,'Argentina','Discover the passionate culture of Argentina.','2025-05-01 00:00:00','2025-05-11 00:00:00',2700.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(14,'South Africa','Experience the wild beauty of South Africa.','2025-06-01 00:00:00','2025-06-11 00:00:00',3500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(15,'Egypt','Uncover the mysteries of ancient Egypt.','2025-07-01 00:00:00','2025-07-11 00:00:00',3000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(16,'Peru','Explore the archaeological wonders of Peru.','2025-08-01 00:00:00','2025-08-11 00:00:00',2800.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(17,'Indonesia','Discover the diverse islands of Indonesia.','2025-09-01 00:00:00','2025-09-11 00:00:00',2600.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(18,'Turkey','Experience the rich history of Turkey.','2025-10-01 00:00:00','2025-10-11 00:00:00',3400.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(19,'Greece','Explore the ancient ruins of Greece.','2025-11-01 00:00:00','2025-11-11 00:00:00',3200.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(20,'Thailand','Immerse in the vibrant culture of Thailand.','2025-12-01 00:00:00','2025-12-11 00:00:00',2900.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(21,'Switzerland','Discover the picturesque landscapes of Switzerland.','2026-01-01 00:00:00','2026-01-11 00:00:00',4700.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(22,'Norway','Experience the stunning fjords of Norway.','2026-02-01 00:00:00','2026-02-11 00:00:00',4500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(23,'Sweden','Explore the historic sites of Sweden.','2026-03-01 00:00:00','2026-03-11 00:00:00',3100.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(24,'Finland','Discover the magical Northern Lights in Finland.','2026-04-01 00:00:00','2026-04-11 00:00:00',3300.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(25,'Denmark','Experience the cozy atmosphere of Denmark.','2026-05-01 00:00:00','2026-05-11 00:00:00',3400.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(26,'Austria','Explore the classical music scene of Austria.','2026-06-01 00:00:00','2026-06-11 00:00:00',3600.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(27,'Belgium','Discover the medieval architecture of Belgium.','2026-07-01 00:00:00','2026-07-11 00:00:00',2800.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(28,'Netherlands','Experience the vibrant city life of the Netherlands.','2026-08-01 00:00:00','2026-08-11 00:00:00',3500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(29,'Poland','Explore the historic cities of Poland.','2026-09-01 00:00:00','2026-09-11 00:00:00',2700.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(30,'Hungary','Discover the thermal baths of Hungary.','2026-10-01 00:00:00','2026-10-11 00:00:00',2600.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(31,'Czech Republic','Experience the fairy-tale towns of the Czech Republic.','2026-11-01 00:00:00','2026-11-11 00:00:00',2800.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(32,'Portugal','Explore the coastal cities of Portugal.','2026-12-01 00:00:00','2026-12-11 00:00:00',3000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(33,'Ireland','Discover the rolling hills of Ireland.','2027-01-01 00:00:00','2027-01-11 00:00:00',3200.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(34,'Scotland','Experience the rugged landscapes of Scotland.','2027-02-01 00:00:00','2027-02-11 00:00:00',3300.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(35,'Wales','Explore the historic castles of Wales.','2027-03-01 00:00:00','2027-03-11 00:00:00',2900.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(36,'New Zealand','Discover the breathtaking sceneries of New Zealand.','2027-04-01 00:00:00','2027-04-11 00:00:00',4600.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(37,'Narnia','Experience the dynamic cities of Narnia.','2027-05-01 00:00:00','2027-05-11 00:00:00',2500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(38,'Malaysia','Explore the diverse cultures of Malaysia.','2027-06-01 00:00:00','2027-06-11 00:00:00',2700.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(39,'Singapore','Discover the futuristic skyline of Singapore.','2027-07-01 00:00:00','2027-07-11 00:00:00',4400.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(40,'Philippines','Experience the pristine beaches of the Philippines.','2027-08-01 00:00:00','2027-08-11 00:00:00',2600.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(41,'South Korea','Explore the bustling streets of South Korea.','2027-09-01 00:00:00','2027-09-11 00:00:00',3400.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(42,'Chile','Discover the diverse landscapes of Chile.','2027-10-01 00:00:00','2027-10-11 00:00:00',3100.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(43,'Colombia','Experience the lively culture of Colombia.','2027-11-01 00:00:00','2027-11-11 00:00:00',2800.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(44,'Morocco','Explore the colorful markets of Morocco.','2027-12-01 00:00:00','2027-12-11 00:00:00',3000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(45,'Israel','Discover the historic sites of Israel.','2028-01-01 00:00:00','2028-01-11 00:00:00',3500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(46,'Jordan','Experience the ancient wonders of Jordan.','2028-02-01 00:00:00','2028-02-11 00:00:00',3300.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(47,'UAE','Explore the modern architecture of the UAE.','2028-03-01 00:00:00','2028-03-11 00:00:00',4200.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(48,'Saudi Arabia','Discover the rich history of Saudi Arabia.','2028-04-01 00:00:00','2028-04-11 00:00:00',4000.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(49,'Qatar','Experience the luxury lifestyle of Qatar.','2028-05-01 00:00:00','2028-05-11 00:00:00',4700.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(50,'Kuwait','Explore the vibrant city of Kuwait.','2028-06-01 00:00:00','2028-06-11 00:00:00',4500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg'),(51,'Italy','Explore the enchanting landscapes of Italy.','2024-05-01 00:00:00','2024-05-10 00:00:00',4500.00,'./uploads/4bfc8d21b62163738cedc37846f1972b.jpg');
/*!40000 ALTER TABLE `holidays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2023-09-24 14:41:14.194545',1,'User','Aek','user@test.ts','$2a$10$AHvM.4cZdnRg6B12q6PwdulDMWsJdQfj/0YRTDs6eFDwy8tUaptfa','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_holidays_holidays`
--

DROP TABLE IF EXISTS `user_holidays_holidays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_holidays_holidays` (
  `userId` int NOT NULL,
  `holidaysId` int NOT NULL,
  PRIMARY KEY (`userId`,`holidaysId`),
  KEY `IDX_fa27f0dfaca0fb4ec5da9f5753` (`userId`),
  KEY `IDX_9d683f55c9febd8740c657d166` (`holidaysId`),
  CONSTRAINT `FK_9d683f55c9febd8740c657d166f` FOREIGN KEY (`holidaysId`) REFERENCES `holidays` (`id`),
  CONSTRAINT `FK_fa27f0dfaca0fb4ec5da9f57537` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_holidays_holidays`
--

LOCK TABLES `user_holidays_holidays` WRITE;
/*!40000 ALTER TABLE `user_holidays_holidays` DISABLE KEYS */;
INSERT INTO `user_holidays_holidays` VALUES (1,1),(1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `user_holidays_holidays` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-04 18:57:03
