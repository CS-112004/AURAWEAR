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
    loginWithGoogle, 
    loginWithEmail, 
    registerWithEmail, 
    logout, 
    loading,
    error,
    clearError
  } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [authLoading, setAuthLoading] = useState(false);

  if (loading) {
    return <div className="pt-40 text-center animate-pulse font-mono tracking-widest uppercase text-gray-400">Initializing Profile...</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    try {
      if (isRegister) {
        await registerWithEmail(formData.email, formData.password, formData.name);
      } else {
        await loginWithEmail(formData.email, formData.password);
      }
    } catch (err) {
      // Error is handled in context
    } finally {
      setAuthLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

  if (!user) {
    return (
      <div className="pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-gray-100 p-8 md:p-12 shadow-sm"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full">
              <User className="w-8 h-8 text-black" />
            </div>
          </div>

          <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-2">
            {isRegister ? 'Join AURA' : 'Welcome Back'}
          </h1>
          <p className="text-gray-400 text-xs uppercase tracking-wider text-center mb-10 font-light">
            {isRegister ? 'Create your minimalist space' : 'Enter your credentials to continue'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 rounded-none border-gray-100 focus-visible:ring-black h-12"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 rounded-none border-gray-100 focus-visible:ring-black h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Password</Label>
                {!isRegister && (
                  <button type="button" className="text-[9px] uppercase tracking-tighter text-gray-400 hover:text-black transition-colors">Forgot Password?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 rounded-none border-gray-100 focus-visible:ring-black h-12"
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 text-red-500 p-3 text-[11px] flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <Button 
              type="submit" 
              disabled={authLoading}
              className="w-full rounded-none bg-black text-white h-14 uppercase tracking-[0.2em] font-bold hover:bg-gray-900 transition-all text-xs"
            >
              {authLoading ? 'Processing...' : (isRegister ? 'Register' : 'Sign In')}
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
              <span className="bg-white px-4 text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={loginWithGoogle}
            className="w-full rounded-none border-gray-100 h-14 flex items-center justify-center gap-3 hover:bg-gray-50 uppercase tracking-widest text-[10px] font-bold"
          >
            <Chrome className="w-4 h-4" /> Google
          </Button>

          <div className="mt-10 text-center">
            <button 
              onClick={() => { setIsRegister(!isRegister); clearError(); }}
              className="text-[11px] font-medium tracking-wide text-gray-400 hover:text-black hover:underline underline-offset-4 transition-all"
            >
              {isRegister ? 'ALREADY HAVE AN ACCOUNT? LOGIN' : 'DON\'T HAVE AN ACCOUNT? REGISTER'}
            </button>
          </div>
        </motion.div>
      </div>
    );
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
