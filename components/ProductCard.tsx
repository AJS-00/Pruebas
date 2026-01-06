import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group">
      <div className="relative overflow-hidden aspect-square">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-semibold rounded-full text-pink-600 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-gray-800 font-bold text-lg mb-1 leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString('es-AR')}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition-colors shadow-lg shadow-pink-100 flex items-center gap-2"
            title="Agregar al carrito"
          >
            <ShoppingCart size={18} />
            <span className="text-sm font-semibold pr-1">Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
