import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Mail, Lock, AlertCircle, Chrome, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const { loginWithGoogle, loginWithEmail, error, clearError, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) navigate('/profile');
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginWithEmail(formData.email, formData.password);
    } catch (err) {
      // Handled in context
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) clearError();
  };

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

        <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-xs uppercase tracking-wider text-center mb-10 font-light">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                className="pl-10 rounded-none border-gray-100 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Password</Label>
              <button type="button" className="text-[9px] uppercase tracking-tighter text-gray-400 hover:text-black transition-colors">Forgot?</button>
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
                className="pl-10 rounded-none border-gray-100 h-12"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full rounded-none bg-black text-white h-14 uppercase tracking-[0.2em] font-bold hover:bg-gray-900 transition-all text-xs"
          >
            {loading ? 'Processing...' : 'Sign In'}
          </Button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-100"></span>
          </div>
          <div className="relative flex justify-center text-[9px] uppercase tracking-widest">
            <span className="bg-white px-4 text-gray-400">Or</span>
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
          <Link 
            to="/register"
            className="text-[11px] font-medium tracking-wide text-gray-400 hover:text-black transition-all flex items-center justify-center gap-2"
          >
            DON'T HAVE AN ACCOUNT? REGISTER <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
