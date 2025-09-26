// Crear modelo a partir de SEQUELIZE
/*
 * el modelo debe contener
 * id INTEGER
 * name STRING
 * price FLOAT
 * stock INTEGER
 * created_at DATETIME  - Lo crea SEQUELIZE automaticamente
 * updated_at DATETIME - Lo crea SEQUELIZE automaticamente
 *
 */
// Guia https://sequelize.org/docs/v6/core-concepts/model-basics/
// Opción Extending Model

// back/models/products.mjs
import { DataTypes, Model } from "sequelize"
import sequelize from "../config/db.mjs"

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true, 
  }
);

export default Product





