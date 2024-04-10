CREATE DATABASE IF NOT EXISTS midestino;

USE midestino;

CREATE TABLE IF NOT EXISTS Aeropuertos (
    id_aeropuerto CHAR(3) PRIMARY KEY,
    nombre VARCHAR(60),
    ciudad VARCHAR(60),
    pais VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS Aerolineas (
    id_aerolinea INT(5) PRIMARY KEY,
    nombre VARCHAR(40),
    pais VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS Vuelos (
    id_vuelo INT(15) AUTO_INCREMENT PRIMARY KEY,
    fecha_ida DATE,
    fecha_vuelta DATE,
    duracion INT(5),
    precio FLOAT,
    numero_asientos INT(3),
    id_aerolinea INT(5),
    id_aeropuerto_salida CHAR(3),
    id_aeropuerto_destino CHAR(3),
    FOREIGN KEY (id_aerolinea) REFERENCES Aerolineas(id_aerolinea),
    FOREIGN KEY (id_aeropuerto_salida) REFERENCES Aeropuertos(id_aeropuerto),
    FOREIGN KEY (id_aeropuerto_destino) REFERENCES Aeropuertos(id_aeropuerto)
);


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

INSERT INTO `aeropuertos` (`id_aeropuerto`, `nombre`, `ciudad`, `pais`) VALUES
('MAD', 'Aeropuerto Adolfo Suárez Madrid-Barajas', 'Madrid', 'España'),
('BCN', 'Aeropuerto de Barcelona-El Prat', 'Barcelona', 'España'),
('PMI', 'Aeropuerto de Palma de Mallorca', 'Palma de Mallorca', 'España'),
('AGP', 'Aeropuerto de Málaga-Costa del Sol', 'Málaga', 'España'),
('SVQ', 'Aeropuerto de Sevilla', 'Sevilla', 'España'),
('TFN', 'Aeropuerto de Tenerife Norte', 'Tenerife', 'España'),
('LPA', 'Aeropuerto de Gran Canaria', 'Gran Canaria', 'España'),
('IBZ', 'Aeropuerto de Ibiza', 'Ibiza', 'España'),
('ACE', 'Aeropuerto de Lanzarote', 'Lanzarote', 'España'),
('VLC', 'Aeropuerto de Valencia', 'Valencia', 'España');

INSERT INTO `vuelos` (`id_vuelo`, `fecha_ida`, `fecha_vuelta`, `duracion`, `precio`, `numero_asientos`, `id_aerolinea`, `id_aeropuerto_salida`, `id_aeropuerto_destino`) VALUES
(1, '2024-05-01', '2024-05-10', 180, 250.00, 150, 1, 'MAD', 'BCN'),
(2, '2024-05-02', '2024-05-09', 120, 150.00, 200, 2, 'BCN', 'MAD'),
(3, '2024-05-03', '2024-05-12', 240, 300.00, 100, 3, 'MAD', 'AGP'),
(4, '2024-05-05', '2024-05-11', 150, 200.00, 180, 4, 'AGP', 'PMI'),
(5, '2024-05-06', '2024-05-13', 90, 120.00, 220, 5, 'PMI', 'SVQ'),
(6, '2024-05-08', '2024-05-15', 210, 280.00, 120, 6, 'SVQ', 'TFN'),
(7, '2024-05-10', '2024-05-17', 180, 250.00, 150, 7, 'TFN', 'LPA'),
(8, '2024-05-11', '2024-05-18', 120, 150.00, 200, 8, 'LPA', 'IBZ'),
(9, '2024-05-13', '2024-05-20', 240, 300.00, 100, 9, 'IBZ', 'ACE'),
(10, '2024-05-14', '2024-05-21', 150, 200.00, 180, 10, 'ACE', 'VLC');
