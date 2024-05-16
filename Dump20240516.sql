CREATE DATABASE  IF NOT EXISTS `sagcityfun` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sagcityfun`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sagcityfun
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` enum('PENDIENTE','APROBADO','RECHAZADO','PASADO','ACTIVO') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'PENDIENTE'),(2,'ACTIVO'),(3,'RECHAZADO'),(4,'PASADO');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idsolicitud` int DEFAULT NULL,
  `posicionamiento` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicitud_id` (`idsolicitud`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`idsolicitud`) REFERENCES `solicitudes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (8,9,5.99),(9,10,0.00),(10,11,1.00);
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudes`
--

DROP TABLE IF EXISTS `solicitudes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `idestado` int NOT NULL,
  `nombreevento` varchar(30) DEFAULT NULL,
  `local` varchar(50) DEFAULT NULL,
  `dia` date DEFAULT NULL,
  `hora` varchar(5) DEFAULT NULL,
  `precio` decimal(4,2) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`idusuario`),
  KEY `fk_estado_solicitud` (`idestado`),
  CONSTRAINT `fk_estado_solicitud` FOREIGN KEY (`idestado`) REFERENCES `estado` (`id`),
  CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`idestado`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
INSERT INTO `solicitudes` VALUES (9,1,2,'Fiesta HAWAIANA','Atic','2024-05-25','18:00',0.00,'www.aticpuerto.com'),(10,2,2,'Fiesta Pirata','Chiringuito Pirata','2024-06-12','20:00',0.00,'www.chiringutopirata.com'),(11,3,2,'Remember 90\'s','Caliza Pool Bar','2024-06-11','18:30',0.00,'www.calizapoolbar.com'),(12,1,2,'Evento de hoy','Local A','2024-05-15','20:00',10.50,'https://example.com/evento_hoy'),(13,2,2,'Otro evento de hoy','Local B','2024-05-15','21:00',8.75,'https://example.com/otro_evento_hoy'),(14,3,2,'Evento de mañana','Local C','2024-05-16','19:00',12.00,'https://example.com/evento_manana'),(15,4,2,'Otro evento de mañana','Local D','2024-05-16','20:30',9.99,'https://example.com/otro_evento_manana'),(16,1,1,'Estado pendiente EV','Local del evento','2024-05-16','20:00',10.50,'https://example.com'),(17,1,2,'EVENTO1','Local del evento','2024-05-16','20:00',10.50,'https://example.com'),(18,1,1,'Nombre del evento','Local del evento','2024-05-25','20:00',10.50,'https://example.com'),(19,4,1,'salsa rosa','jjj','2024-05-04','18:30',0.00,'...'),(20,4,1,'h','el mio','2024-05-16','15:52',0.00,'l'),(21,4,1,'ju','mi casa','2024-05-16','08:25',0.00,'jjjj');
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasena` varchar(44) NOT NULL,
  `rol` enum('A','U') NOT NULL DEFAULT 'U',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `chk_contrasena_longitud` CHECK ((length(`contrasena`) >= 8)),
  CONSTRAINT `chk_email_formato` CHECK ((`email` like _utf8mb4'%@%'))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'usuario1@hotmail.com','María','abcabc123','U'),(2,'usuario2@yahoo.com','Pedro','passw0rd13','U'),(3,'admin@admin.com','Administrador','admin123','A'),(4,'thais@hotmail.com','Thais','Kilian16','U');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 21:03:01
