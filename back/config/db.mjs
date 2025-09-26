// Crear conexión a bases de datos con SEQUELIZE
// https://sequelize.org/docs/v6/getting-started/
// Mirar opción de la guia de sequelize
// Utilizar variables de entorno para la conexion
import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASS,     
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize
