import { useState, useEffect } from "react";

export default function ProductForm({ onSave, editingProduct }) {
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    } else {
      setForm({ name: "", price: "", stock: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    setForm({ name: "", price: "", stock: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FFF8F0] border border-gray-200 rounded-xl shadow-md 
                 w-[320px] p-6 flex flex-col gap-4 text-center"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {editingProduct ? "Editar Producto" : "Nuevo Producto"}
      </h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transform  duration-300 hover:scale-105"
        required
      />
      <input
        type="number"
        step="0.01"
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio"
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transform  duration-300 hover:scale-105"
        required
      />
      <input
        type="number"
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transform  duration-300 hover:scale-105"
        required
      />

      <button
        type="submit"
        className={`w-full py-2 rounded-lg font-semibold text-white shadow-md transform  duration-300 hover:scale-105 ${
          editingProduct
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {editingProduct ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}
