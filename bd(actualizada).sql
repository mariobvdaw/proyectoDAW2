-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2024 a las 22:29:06
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `midestino`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aerolineas`
--

CREATE TABLE `aerolineas` (
  `id_aerolinea` int(5) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `pais` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aerolineas`
--

INSERT INTO `aerolineas` (`id_aerolinea`, `nombre`, `pais`) VALUES
(1, 'Iberia', 'España'),
(2, 'Vueling', 'España'),
(3, 'Ryanair', 'Irlanda'),
(4, 'Air Europa', 'España'),
(5, 'Air France', 'Francia'),
(6, 'Lufthansa', 'Alemania'),
(7, 'British Airways', 'Reino Unido'),
(8, 'Alitalia', 'Italia'),
(9, 'KLM', 'Países Bajos'),
(10, 'Turkish Airlines', 'Turquía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aeropuertos`
--

CREATE TABLE `aeropuertos` (
  `id_aeropuerto` char(3) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `ciudad` varchar(60) DEFAULT NULL,
  `pais` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `aeropuertos`
--

INSERT INTO `aeropuertos` (`id_aeropuerto`, `nombre`, `ciudad`, `pais`) VALUES
('ACE', 'Aeropuerto de Lanzarote', 'Lanzarote', 'España'),
('AGP', 'Aeropuerto de Málaga-Costa del Sol', 'Málaga', 'España'),
('BCN', 'Aeropuerto de Barcelona-El Prat', 'Barcelona', 'España'),
('IBZ', 'Aeropuerto de Ibiza', 'Ibiza', 'España'),
('LPA', 'Aeropuerto de Gran Canaria', 'Gran Canaria', 'España'),
('MAD', 'Aeropuerto Adolfo Suárez Madrid-Barajas', 'Madrid', 'España'),
('PMI', 'Aeropuerto de Palma de Mallorca', 'Palma de Mallorca', 'España'),
('SVQ', 'Aeropuerto de Sevilla', 'Sevilla', 'España'),
('TFN', 'Aeropuerto de Tenerife Norte', 'Tenerife', 'España'),
('VLC', 'Aeropuerto de Valencia', 'Valencia', 'España');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `contrasena` varchar(40) DEFAULT NULL,
  `prefijo_movil` int(5) DEFAULT NULL,
  `telefono` int(15) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `cod_postal` int(10) DEFAULT NULL,
  `pais` varchar(60) DEFAULT NULL,
  `localidad` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contrasena`, `prefijo_movil`, `telefono`, `direccion`, `cod_postal`, `pais`, `localidad`) VALUES
(1, 'Mario', 'mario@email.com', 'a', NULL, NULL, NULL, NULL, NULL, NULL),
(22, 'asd', 'asdasd', 'asd', 123, 213, 'a', 123, 'aasd', 'asd');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vuelos`
--

CREATE TABLE `vuelos` (
  `id_vuelo` int(15) NOT NULL,
  `fecha_ida` date DEFAULT NULL,
  `duracion` int(5) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `numero_asientos` int(3) DEFAULT NULL,
  `id_aerolinea` int(5) DEFAULT NULL,
  `id_aeropuerto_salida` char(3) DEFAULT NULL,
  `id_aeropuerto_destino` char(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vuelos`
--

INSERT INTO `vuelos` (`id_vuelo`, `fecha_ida`, `duracion`, `precio`, `numero_asientos`, `id_aerolinea`, `id_aeropuerto_salida`, `id_aeropuerto_destino`) VALUES
(1, '2024-05-01', 180, 250, 150, 1, 'MAD', 'BCN'),
(2, '2024-05-02', 120, 150, 200, 2, 'BCN', 'MAD'),
(3, '2024-05-03', 240, 300, 100, 3, 'MAD', 'AGP'),
(4, '2024-05-05', 150, 200, 180, 4, 'AGP', 'PMI'),
(5, '2024-05-06', 90, 120, 220, 5, 'PMI', 'SVQ'),
(6, '2024-05-08', 210, 280, 120, 6, 'SVQ', 'TFN'),
(7, '2024-05-10', 180, 250, 150, 7, 'TFN', 'LPA'),
(8, '2024-05-11', 120, 150, 200, 8, 'LPA', 'IBZ'),
(9, '2024-05-13', 240, 300, 100, 9, 'IBZ', 'ACE'),
(10, '2024-05-14', 150, 200, 180, 10, 'ACE', 'VLC');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aerolineas`
--
ALTER TABLE `aerolineas`
  ADD PRIMARY KEY (`id_aerolinea`);

--
-- Indices de la tabla `aeropuertos`
--
ALTER TABLE `aeropuertos`
  ADD PRIMARY KEY (`id_aeropuerto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `vuelos`
--
ALTER TABLE `vuelos`
  ADD PRIMARY KEY (`id_vuelo`),
  ADD KEY `id_aerolinea` (`id_aerolinea`),
  ADD KEY `id_aeropuerto_salida` (`id_aeropuerto_salida`),
  ADD KEY `id_aeropuerto_destino` (`id_aeropuerto_destino`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `vuelos`
--
ALTER TABLE `vuelos`
  MODIFY `id_vuelo` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `vuelos`
--
ALTER TABLE `vuelos`
  ADD CONSTRAINT `vuelos_ibfk_1` FOREIGN KEY (`id_aerolinea`) REFERENCES `aerolineas` (`id_aerolinea`),
  ADD CONSTRAINT `vuelos_ibfk_2` FOREIGN KEY (`id_aeropuerto_salida`) REFERENCES `aeropuertos` (`id_aeropuerto`),
  ADD CONSTRAINT `vuelos_ibfk_3` FOREIGN KEY (`id_aeropuerto_destino`) REFERENCES `aeropuertos` (`id_aeropuerto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
