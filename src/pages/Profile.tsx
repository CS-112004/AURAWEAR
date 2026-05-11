import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LogOut, User, Package, MapPin, Settings, ChevronRight, Mail, Lock, UserPlus, AlertCircle, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { 
    user, 
    logout, 
    loading,
  } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="pt-40 text-center animate-pulse font-mono tracking-widest uppercase text-gray-400">Initializing Profile...</div>;
  }

  if (!user) {
    return null; // Will redirect
  }

  const menuItems = [
    { name: 'Order History', icon: Package, path: '/profile/orders' },
    { name: 'My Addresses', icon: MapPin, path: '/profile/addresses' },
    { name: 'Account Settings', icon: Settings, path: '/profile/settings' },
  ];

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Sidebar */}
        <aside className="w-full md:w-80">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50/50 p-8 mb-8 border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-gray-200">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-black text-white">
                    {user.displayName?.[0] || user.email?.[0]}
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight uppercase tracking-tight mb-1">{user.displayName || 'AURA CLIENT'}</h2>
                <p className="text-[10px] text-gray-400 font-light truncate max-w-[150px] uppercase">{user.email}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={logout}
              className="w-full rounded-none border-gray-200 text-[10px] uppercase tracking-[0.2em] font-bold py-6 hover:bg-black hover:text-white transition-all flex gap-3"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </motion.div>

          <nav className="space-y-3">
            {menuItems.map((item, idx) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="w-full flex items-center justify-between p-6 bg-white border border-gray-50 hover:border-black transition-all group"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-4 h-4 text-gray-400 group-hover:text-black" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">{item.name}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4 leading-none">
              HELLO, <br />
              <span className="text-gray-300">{user.displayName?.split(' ')[0] || 'READY'}</span>
            </h1>
            <p className="text-gray-500 font-light text-sm max-w-md leading-relaxed">
              Welcome back to your curated space. Your preferences, order history, and exclusive AURA access are managed here.
            </p>
          </motion.div>

          {/* Recent Orders Overview */}
          <section>
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Order Activity</h3>
              <button className="text-[9px] uppercase tracking-widest font-bold underline underline-offset-4 hover:text-gray-400 transition-colors">View All</button>
            </div>
            <div className="bg-white p-16 text-center border border-gray-100 shadow-sm">
               <Package className="w-10 h-10 text-gray-100 mx-auto mb-6" />
               <p className="text-sm text-gray-400 font-light italic mb-8 italic">No recent orders found. Explore our latest drop.</p>
               <Button 
                variant="outline" 
                onClick={() => navigate('/shop')}
                className="rounded-none border-black border-2 px-10 py-6 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-black hover:text-white transition-all"
               >
                 Discover Modernity
               </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
