import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { ChevronLeft, Lock, ArrowRight, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  if (cart.length === 0) {
    return (
      <div className="pt-40 text-center">
        <p className="mb-6">Your bag is empty. Please add items before checking out.</p>
        <Link to="/shop"><Button>Go to Shop</Button></Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Checkout Area */}
          <div className="lg:col-span-8 flex-grow">
            <header className="mb-12 flex items-center justify-between">
              <Link to="/cart" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black">
                <ChevronLeft className="w-4 h-4" /> Back to Bag
              </Link>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <Lock className="w-3 h-3" /> Secure Checkout
              </div>
            </header>

            <div className="space-y-12">
              {/* Step 1: Shipping */}
              <section className={`p-8 bg-white border ${step === 1 ? 'border-black' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-black text-white text-xs flex items-center justify-center">1</span>
                    Shipping Details
                  </h2>
                  {step > 1 && <Button variant="link" onClick={() => setStep(1)} className="text-xs uppercase tracking-widest font-bold underline">Edit</Button>}
                </div>
                
                {step === 1 && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="First Name" className="rounded-none h-14 border-gray-100" />
                    <Input placeholder="Last Name" className="rounded-none h-14 border-gray-100" />
                    <Input placeholder="Email Address" className="col-span-2 rounded-none h-14 border-gray-100" />
                    <Input placeholder="Home Address" className="col-span-2 rounded-none h-14 border-gray-100" />
                    <Input placeholder="City" className="rounded-none h-14 border-gray-100" />
                    <Input placeholder="Postal Code" className="rounded-none h-14 border-gray-100" />
                    <Button 
                      onClick={() => setStep(2)}
                      className="col-span-2 h-16 bg-black text-white rounded-none uppercase tracking-widest font-bold mt-4"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                )}
              </section>

              {/* Step 2: Payment */}
              <section className={`p-8 bg-white border ${step === 2 ? 'border-black' : 'border-gray-100 opacity-60'}`}>
                <h2 className="text-xl font-bold uppercase tracking-tight flex items-center gap-4 mb-8">
                  <span className="w-8 h-8 rounded-full bg-black text-white text-xs flex items-center justify-center">2</span>
                  Payment Method
                </h2>
                
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="p-6 border border-black flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Credit Card</span>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-8 h-5 bg-gray-200" />
                         <div className="w-8 h-5 bg-gray-300" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="Card Number" className="col-span-2 rounded-none h-14 border-gray-100" />
                      <Input placeholder="Expiration (MM/YY)" className="rounded-none h-14 border-gray-100" />
                      <Input placeholder="CVV" className="rounded-none h-14 border-gray-100" />
                    </div>

                    <Button 
                      className="w-full h-16 bg-black text-white rounded-none uppercase tracking-[0.2em] font-bold mt-8 flex items-center justify-center gap-2"
                    >
                      Process Secure Payment <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Sidebar Summary */}
          <aside className="lg:w-96">
            <div className="bg-white p-8 border border-gray-100 sticky top-32">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8">Order Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                      <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[10px] font-bold uppercase tracking-widest leading-tight mb-1">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-light uppercase tracking-widest mb-1">{item.selectedSize} / {item.selectedColor}</p>
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-light">Qty: {item.quantity}</span>
                         <span className="text-[10px] font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="mb-6" />

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-xs font-light text-gray-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-light text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-black border-t border-gray-50 pt-4">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-50">
                 <p className="text-[9px] text-gray-400 font-light tracking-wide uppercase text-center leading-relaxed">
                   Free returns on all orders within 30 days. <br/>
                   No questions asked.
                 </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
