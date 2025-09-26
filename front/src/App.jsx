import { useState, useEffect } from "react";
import ProductForm from "./componentes/ProductForm";
import ProductList from "./componentes/ProductList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Cargar productos al iniciar
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Guardar producto nuevo o actualizar existente
  const handleSave = async (form) => {
    // Verificar duplicado (ignorando mayúsculas/minúsculas)
    const nombreLower = form.name.trim().toLowerCase();
    const existe = products.some(
      (p) =>
        p.name.trim().toLowerCase() === nombreLower &&
        (!editingProduct || p.id !== editingProduct.id)
    );

    if (existe) {
      alert("Este producto ya está cargado.");
      return;
    }

    if (editingProduct) {
      // Actualizar producto
      await fetch(`http://localhost:3000/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingProduct(null);
    } else {
      // Guardar producto nuevo
      await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    fetchProducts();
  };

  // Borrar producto
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // Cargar producto en el formulario para editar
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-300 to-amber-600 flex flex-col items-center px-4 py-8 gap-6">
      <ProductForm onSave={handleSave} editingProduct={editingProduct} />
      <ProductList
        products={products}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
