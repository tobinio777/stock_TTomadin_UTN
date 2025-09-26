import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export default function ProductList({ products, onDelete, onEdit }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 * (index % 2 === 0 ? -1 : 1) }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProductCard product={product} onEdit={onEdit} onDelete={onDelete} />
        </motion.div>
      ))}
    </div>
  );
}
