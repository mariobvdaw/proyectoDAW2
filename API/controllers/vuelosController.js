const db = require("../database/db");

const getById = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexion", err);
    } else {
      const id = req.params.id;

      connection.query(
        "SELECT * FROM vuelos WHERE id_vuelo = ?",
        [id],
        (err, resultados) => {
          if (err) {
            console.error(
              "Error al obtener el registro desde la base de datos:",
              err
            );
            res.status(500).json({ error: "Error interno del servidor" });
          } else {
            // Verifica si se encontró un registro
            if (resultados.length > 0) {
              res.json(resultados[0]); // Devuelve el primer resultado encontrado (debería ser único)
            } else {
              res.status(404).json({ error: "Registro no encontrado" });
            }
          }
          connection.release();
        }
      );
    }
  });
};

const getVuelos = (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error en la conexión", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    const { ciudad_origen, ciudad_destino, fecha_ida, fecha_vuelta } = req.body;


    connection.query(
      `SELECT id_aeropuerto FROM aeropuertos 
      WHERE ciudad = ?`,
      [ciudad_origen],
      (err, aeropuertoIda) => {
        if (err) {
          console.error("Error al obtener los vuelos de ida desde la base de datos:", err);
          res.status(500).json({ error: "Error interno del servidor" });
          return;
        }
        connection.query(
          `SELECT id_aeropuerto FROM aeropuertos 
          WHERE ciudad = ?`,
          [ciudad_destino],
          (err, aeropuertoVuelta) => {
            if (err) {
              console.error("Error al obtener los vuelos de ida desde la base de datos:", err);
              res.status(500).json({ error: "Error interno del servidor" });
              return;
            }

            // consulta para vuelos de ida
            connection.query(
              `SELECT * FROM vuelos 
      WHERE id_aeropuerto_salida IN (SELECT id_aeropuerto FROM aeropuertos WHERE ciudad = ?)
      AND id_aeropuerto_destino IN (SELECT id_aeropuerto FROM aeropuertos WHERE ciudad = ?)
      AND fecha_ida = ?`,
              [ciudad_origen, ciudad_destino, fecha_ida],
              (err, resultadosIda) => {
                if (err) {
                  console.error("Error al obtener los vuelos de ida desde la base de datos:", err);
                  res.status(500).json({ error: "Error interno del servidor" });
                  return;
                }

                // consulta para vuelos de vuelta
                connection.query(
                  `SELECT * FROM vuelos 
          WHERE id_aeropuerto_salida IN (SELECT id_aeropuerto FROM aeropuertos WHERE ciudad = ?)
          AND id_aeropuerto_destino IN (SELECT id_aeropuerto FROM aeropuertos WHERE ciudad = ?)
          AND fecha_ida = ?`,
                  [ciudad_destino, ciudad_origen, fecha_vuelta],
                  (err, resultadosVuelta) => {
                    if (err) {
                      console.error("Error al obtener los vuelos de vuelta desde la base de datos:", err);
                      res.status(500).json({ error: "Error interno del servidor" });
                      return;
                    }

                    // juntar y agrupar los vuelos de ida y vuelta
                    const vuelos = [...resultadosIda, ...resultadosVuelta];

                    const vuelosAgrupados = agruparVuelos(vuelos, aeropuertoIda[0].id_aeropuerto, aeropuertoVuelta[0].id_aeropuerto)
                    if (vuelos.length > 0) {
                      res.json(vuelosAgrupados);
                    } else {
                      res.status(404).json({ error: "No se encontraron vuelos para las opciones proporcionadas" });
                    }
                  }
                );
              }
            );
          });
      });
  });
};

// Función para agrupar vuelos de ida y vuelta
const agruparVuelos = (vuelos, aeropuertoIda, aeropuertoVuelta) => {
  const vuelosAgrupados = [];
  const vuelosIda = vuelos.filter(vuelo => vuelo.id_aeropuerto_salida === aeropuertoIda);
  const vuelosVuelta = vuelos.filter(vuelo => vuelo.id_aeropuerto_salida === aeropuertoVuelta);

  vuelosIda.forEach(vueloIda => {
    // modificable: en lugar de usar un vuelo aleatorio crear un agrupamiento diferente por cada vuelo
    const vueloVuelta = vuelosVuelta[Math.floor(Math.random() * vuelosVuelta.length)];
    if (vueloVuelta) {
      vuelosAgrupados.push({
        vueloIda,
        vueloVuelta
      });
    }
  });

  return vuelosAgrupados;
};

module.exports =
{
  getById,
  getVuelos,
};