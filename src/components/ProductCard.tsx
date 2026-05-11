import * as React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        {product.isNewArrival && (
          <span className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            New
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            className="bg-white text-black hover:bg-black hover:text-white rounded-none px-6 py-4 text-xs uppercase tracking-[0.2em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform"
          >
            Quick View
          </Button>
        </div>
      </Link>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest mb-1 hover:underline underline-offset-4">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-2 font-medium">
            {product.category} / {product.subcategory}
          </p>
          <p className="font-bold text-sm">${product.price.toFixed(2)}</p>
        </div>
        <button className="p-2 hover:bg-gray-100 transition-colors">
          <ShoppingBag className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
