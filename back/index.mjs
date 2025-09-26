// GUIA https://expressjs.com/en/guide/routing.html

// Importar Express
import express from "express";
import cors from "cors";  // 👈 Importar cors
import sequelize from "./config/db.mjs";
import Product from "./models/products.mjs";

// Crear servidor Express
const app = express();

// Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors({ origin: "http://localhost:5173" })); 
// Si querés permitir todos los orígenes, usá simplemente: app.use(cors());

app.use(express.json()); // soporte JSON

// Ruta GET - Obtener todos los productos
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta POST - Crear producto
app.post("/products", async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.create({ name, price, stock });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta PUT - Modificar producto
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta DELETE - Eliminar producto
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    await product.destroy();
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

console.log("Intentando conectar a la DB...");
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Error al conectar con la DB:", error));
