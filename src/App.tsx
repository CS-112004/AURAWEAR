/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

// Lazy load pages for performance
const Home = lazy(() => import('@/pages/Home'));
const Shop = lazy(() => import('@/pages/Shop'));
const ProductDetails = lazy(() => import('@/pages/ProductDetails'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Profile = lazy(() => import('@/pages/Profile'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Admin = lazy(() => import('@/pages/Admin'));
const Story = lazy(() => import('@/pages/Story'));

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <Router>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <CartProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-white flex flex-col font-sans">
                <Navbar />
                <main className="flex-grow">
                  <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center font-mono animate-pulse">AURAWEAR...</div>}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/shop/:category" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/story" element={<Story />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
            </TooltipProvider>
          </CartProvider>
        </AuthProvider>

      </I18nextProvider>
    </Router>
  );
}


