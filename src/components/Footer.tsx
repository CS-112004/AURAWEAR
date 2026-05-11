import { Link } from 'react-router-dom';
import { Mail, Github, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold tracking-[0.2em] mb-6">AURAWEAR</h3>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              Sophisticated apparel designed for those who navigate the world with intention and grace.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-gray-300 transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li><Link to="/shop/men" className="hover:text-white transition-colors">Men's Collection</Link></li>
              <li><Link to="/shop/women" className="hover:text-white transition-colors">Women's Collection</Link></li>
              <li><Link to="/shop/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li><Link to="/story" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-gray-400 font-light mb-6">Subscribe to receive updates on new collections and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="bg-transparent border-b border-gray-700 py-2 flex-grow focus:outline-none focus:border-white transition-colors font-light"
              />
              <button className="uppercase text-xs font-semibold tracking-widest hover:text-gray-300 transition-colors">Join</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light tracking-widest">
          <p>© 2026 AURAWEAR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span>ENGLISH (US)</span>
            <span>USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
