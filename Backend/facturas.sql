-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.32-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para facturas
CREATE DATABASE IF NOT EXISTS `facturas` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `facturas`;

-- Volcando estructura para tabla facturas.detalle_facturas
CREATE TABLE IF NOT EXISTS `detalle_facturas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_FACTURA` int(11) NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  `CONCEPTO` varchar(200) NOT NULL,
  `PRECIO` double NOT NULL,
  `TIPO_IVA` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla facturas.detalle_facturas: 17 rows
DELETE FROM `detalle_facturas`;
/*!40000 ALTER TABLE `detalle_facturas` DISABLE KEYS */;
INSERT INTO `detalle_facturas` (`ID`, `ID_FACTURA`, `CANTIDAD`, `CONCEPTO`, `PRECIO`, `TIPO_IVA`) VALUES
	(1, 1, 2, 'Salchicón de Lorca', 5.26, 4),
	(2, 1, 4, 'Mortadela con olivas', 3.72, 4),
	(3, 1, 3, 'Atún en escabeche', 4.83, 4),
	(4, 1, 2, 'Pendrais de 16 GB', 8.23, 21),
	(5, 2, 1, 'Jamón Bellota 7kg', 145, 4),
	(6, 2, 4, 'Puntero laser rojo', 26.11, 21),
	(7, 3, 2, 'Cuerda escalada 10.2 mm x 60 m.', 96.22, 21),
	(8, 3, 10, 'Aseguradoras expres escalada', 7.4, 21),
	(9, 4, 5, 'Gafas de sol pa chulearse', 67.5, 21),
	(10, 4, 7, 'Fijador para el pelo con brillantina GREASE', 13.45, 7),
	(11, 4, 4, 'Vaselina pa los labios', 4.3, 9),
	(12, 5, 100, 'Profilácticos barriguitas', 0.7, 14),
	(13, 5, 2, 'Colonia pachuli', 11, 21),
	(14, 7, 2, 'Consolador momentos de soledad', 37.84, 21),
	(15, 7, 3, 'Gel de Masaje Estimulante Durex Play 200 ml.', 11.05, 21),
	(16, 7, 2, 'Baby-Doll con flecos', 21.99, 21),
	(17, 7, 2, 'Sotana talla M', 250, 21);
/*!40000 ALTER TABLE `detalle_facturas` ENABLE KEYS */;

-- Volcando estructura para tabla facturas.facturas
CREATE TABLE IF NOT EXISTS `facturas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NUMERO` varchar(8) NOT NULL,
  `ID_CLIENTE` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Volcando datos para la tabla facturas.facturas: 7 rows
DELETE FROM `facturas`;
/*!40000 ALTER TABLE `facturas` DISABLE KEYS */;
INSERT INTO `facturas` (`ID`, `NUMERO`, `ID_CLIENTE`, `FECHA`) VALUES
	(1, 'FE0001', 1, '2015-02-14'),
	(2, 'FE0002', 2, '2015-02-14'),
	(3, 'FE0003', 2, '2015-02-15'),
	(4, 'FE0004', 2, '2015-02-15'),
	(5, 'FE0005', 3, '2015-02-15'),
	(6, 'FE0006', 4, '2015-02-16'),
	(7, 'FE0007', 5, '2015-02-17');
/*!40000 ALTER TABLE `facturas` ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
