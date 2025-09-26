export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div
      className="relative w-[250px] bg-[#FFF8F0] rounded-xl shadow-md border border-gray-200 
                 p-6 flex flex-col items-center text-center transform transition-transform 
                 hover:scale-105 hover:shadow-2xl hover:shadow-black duration-300"
    >
      {/* Bandera decorativa */}
      <div className="absolute top-0 right-6 w-6 h-10 bg-red-500 rounded-b-md"></div>

      {/* Nombre */}
      <h2 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h2>

      {/* Precio */}
      <p className="text-2xl font-bold text-red-700 mb-1">${product.price}</p>

      {/* Stock */}
      <p className="text-xl font-black text-orange-600 mb-4">Stock: {product.stock}</p>

      {/* Rating fijo estilo ejemplo */}
      <div className="flex justify-center mb-4 text-red-600 text-lg">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      {/* Botones */}
      <div className="flex gap-2 w-full">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-yellow-400 hover:bg-yellow-800 px-2 py-2 rounded-lg shadow text-white font-semibold"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-500 hover:bg-red-900 px-2 py-2 rounded-lg shadow text-white font-semibold"
        >
          Borrar
        </button>
      </div>
    </div>
  );
}
