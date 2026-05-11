import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-gray-300" />
        </div>
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">Your Bag is Empty</h1>
        <p className="text-gray-500 font-light max-w-sm mb-10">
          Looks like you haven't added anything to your bag yet. Explore our latest collections to find something special.
        </p>
        <Link to="/shop">
          <Button className="rounded-none bg-black text-white px-10 py-6 uppercase tracking-widest font-bold">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold uppercase tracking-tight mb-12">Shopping Bag ({cartCount})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-6 pb-8 border-b border-gray-100"
              >
                <div className="w-24 md:w-32 aspect-[3/4] bg-gray-100 flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-bold uppercase tracking-tight">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="p-1 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-4 text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4">
                      <span>Size: {item.selectedSize}</span>
                      <span>Color: {item.selectedColor}</span>
                    </div>
                    <p className="font-bold text-sm">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 self-start bg-gray-50 p-8">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-8">Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-light">Subtotal</span>
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-light">Estimated Shipping</span>
              <span className="font-bold">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-light">Tax</span>
              <span className="font-bold">--</span>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex justify-between text-lg font-bold mb-10">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <Link to="/checkout">
            <Button className="w-full h-16 rounded-none bg-black text-white hover:bg-gray-900 uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 group">
              Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <div className="mt-8 text-[10px] text-gray-400 font-light leading-relaxed text-center">
            By proceeding to checkout, you agree to our Terms of Use and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
}
