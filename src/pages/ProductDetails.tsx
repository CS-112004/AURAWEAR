import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../mockData';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, Truck, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <div className="pt-40 text-center">Product not found</div>;

  return (
    <div className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-8">
        <Link to="/" className="hover:text-black">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/shop/${product.category}`} className="hover:text-black">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Images Grid */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto scrollbar-none max-h-[600px]">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 md:w-24 aspect-[3/4] flex-shrink-0 border-2 transition-all ${
                  activeImage === i ? 'border-black' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-grow aspect-[3/4] bg-gray-100 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-2 block">
                  {product.subcategory}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-2">
                  {product.name}
                </h1>
              </div>
              <button className="p-2 hover:bg-gray-100 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-black' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50 underline">
                {product.reviewsCount} Reviews
              </span>
            </div>

            <p className="text-2xl font-bold mb-8">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-500 font-light leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <Separator className="mb-8" />

          {/* Configuration */}
          <div className="space-y-8 mb-10">
            {/* Colors */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-4">Color: {selectedColor}</span>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                      selectedColor === color.name ? 'border-black' : 'border-transparent'
                    }`}
                  >
                    <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest">Select Size</span>
                <button className="text-[10px] font-bold uppercase tracking-widest underline opacity-50">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-grow h-12 flex items-center justify-center border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button 
            onClick={() => addToCart(product, selectedSize, selectedColor)}
            className="w-full h-16 rounded-none bg-black text-white hover:bg-gray-900 uppercase tracking-[0.3em] font-bold mb-8"
          >
            Add to Bag
          </Button>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-6 bg-gray-50 p-6">
            <div className="flex gap-4">
              <Truck className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Fast Shipping</p>
                <p className="text-[10px] font-light text-gray-500">Free delivery on orders over $150</p>
              </div>
            </div>
            <div className="flex gap-4">
              <RefreshCw className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Easy Returns</p>
                <p className="text-[10px] font-light text-gray-500">30-day extended return window</p>
              </div>
            </div>
            <div className="flex gap-4">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1">Secure Payment</p>
                <p className="text-[10px] font-light text-gray-500">Industry standard SSL protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
