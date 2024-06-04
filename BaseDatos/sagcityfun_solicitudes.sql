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
  `idpago` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`idusuario`),
  KEY `fk_estado_solicitud` (`idestado`),
  KEY `solicitudes3_idx` (`idpago`),
  CONSTRAINT `solicitudes3` FOREIGN KEY (`idpago`) REFERENCES `pago` (`id`),
  CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`idestado`) REFERENCES `estado` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudes`
--

LOCK TABLES `solicitudes` WRITE;
/*!40000 ALTER TABLE `solicitudes` DISABLE KEYS */;
INSERT INTO `solicitudes` VALUES (9,1,4,'Fiesta HAWAIANA','Atic','2024-05-25','18:00',0.00,'www.aticpuerto.com',NULL),(10,2,1,'Fiesta Pirata','Chiringuito Pirata','2024-06-12','20:00',0.00,'www.chiringutopirata.com',NULL),(11,3,2,'Remember 90\'s','Caliza Pool Bar','2024-06-11','18:30',0.00,'www.calizapoolbar.com',NULL),(12,1,4,'Evento de hoy','Local A','2024-05-15','20:00',10.50,'https://example.com/evento_hoy',NULL),(13,2,4,'Otro evento de hoy','Local B','2024-05-15','21:00',8.75,'https://example.com/otro_evento_hoy',NULL),(14,3,4,'Evento de mañana','Local C','2024-05-16','19:00',12.00,'https://example.com/evento_manana',NULL),(15,4,4,'Otro evento de mañana','Local D','2024-05-16','20:30',9.99,'https://example.com/otro_evento_manana',NULL),(16,1,4,'Estado pendiente EV','Local del evento','2024-05-16','20:00',10.50,'https://example.com',NULL),(17,1,4,'EVENTO1','Local del evento','2024-05-16','20:00',10.50,'https://example.com',NULL),(18,1,3,'Nombre del evento','Local del evento','2024-05-25','20:00',10.50,'https://example.com',NULL),(19,4,4,'salsa rosa','jjj','2024-05-04','18:30',0.00,'...',NULL),(20,4,4,'h','el mio','2024-05-16','15:52',0.00,'l',NULL),(21,4,3,'ju','mi casa','2024-05-16','08:25',0.00,'jjjj',NULL),(22,4,3,'Esto ya va','mi casa','2024-05-18','18:30',3.00,'jjjjj',NULL),(23,4,1,'segundo Eventp',' mi casa','2024-05-18','18:30',3.00,'lhkjlk',NULL),(24,4,1,'Esto ya va','kjlñ','2024-05-18','18:35',0.00,'nkklk',NULL),(25,4,1,'Esto ya va','mi casa','2024-05-18','21:45',4.00,'',NULL),(26,4,3,'PruebaFinal','el mio','2024-05-19','18:30',0.00,'jj',NULL),(27,4,2,'Pueba','mi casa','2024-05-31','18:30',1.00,'jjjlllllllll',15),(28,4,4,'Hola','el mio','2024-05-19','08:35',1.00,'',18),(29,4,4,'Fietsa pirata','mi casa','2024-05-25','18:35',0.00,'',19),(30,4,1,'PruebaBoton','mi puta casa','2024-05-08','18:35',0.00,'jjj',22),(31,4,1,'pruba','prueba2','2027-05-27','14:50',4.00,'',NULL),(32,4,1,'thais orueba','mlkajkl','2024-05-22','18:06',4.00,'llllllllll',49),(33,4,1,'kkkkkk','lolo','2024-05-24','18:52',1.00,'lll',49),(34,4,1,'kkkkkk','lolo','2024-05-24','18:52',1.00,'lll',49),(35,4,4,'lololol','kkk','2024-05-23','18:50',0.00,'llllllllll',49),(36,4,1,'evento 25','mi bar','2024-05-25','18:50',0.00,'',75),(37,4,1,'ya funciona','de maravilla','2025-05-25','18:50',15.00,'',76),(38,4,1,'Pan pan pan','pim pum','2024-05-25','12:50',10.00,'',77),(39,4,1,'Prueba boton','en mi casa','2024-05-27','15:50',3.00,'kkk',78),(40,4,1,'pim','poam','2024-05-25','18:50',3.00,'',78),(41,4,1,'nombre','local','2024-05-27','18:50',0.00,'eee',NULL),(42,4,1,'nombre con posi','local','2024-06-19','05:00',0.00,'',NULL),(43,4,1,'pimpan','el','2024-05-29','20:01',5.00,'',NULL),(44,4,1,'pimpan','el','2024-05-29','20:01',5.00,'',NULL),(45,4,1,'pqa','jjjj','2024-06-01','18:50',0.00,'qqq',79),(46,4,1,'PruebaHoy','mi casa','2024-05-31','18:30',0.00,'mmm',NULL),(107,4,2,'Música Sagunto','Teatro Romano','2024-06-15','22:00',0.00,'https://www.festivalsagunto.com/',81),(108,4,1,'Concierto años 80','Auditori','2024-06-15','21:00',0.00,'https://www.vetustamorla.com/conciertos/',82),(109,5,2,'Vive el SOUL','Teatro Romano','2024-06-15','20:00',5.00,'https://www.teatroromano.es',83),(110,4,1,'Concierto Izal','Plaza Mayor','2024-06-15','22:30',30.00,'https://www.izal.es/conciertos/',84),(111,4,2,'Festival musica clásica','Teatro Romano','2024-06-15','19:00',15.00,'https://www.saguntofilmfestival.com/',85),(112,5,1,'Concierto Hombres G','Auditori','2024-06-15','21:30',28.00,'https://www.hombresg.com/conciertos/',86),(113,4,1,'Concierto Morat','Plaza Mayor','2024-06-15','23:00',38.00,'https://www.morat.com/conciertos/',88),(114,5,2,'Fiesta REMEMBER','Chiringuito Pirata','2024-06-15','20:00',22.00,'https://www.pirata.es',89),(115,4,2,'Festival de Jazz','Teatro Romano','2024-06-15','22:00',2.00,'https://www.jazzsagunto.com/',87),(117,4,1,'Fiesta Pijamas','Agua de menta','2024-06-16','18:00',0.00,'www.aguadementa.com',NULL),(118,4,1,'Salsa rosa','Salsa rosa','2024-06-16','18:30',0.00,'www.salsarosa.com',90);
/*!40000 ALTER TABLE `solicitudes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-04 11:47:32
