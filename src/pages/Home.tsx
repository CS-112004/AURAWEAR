import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MOCK_PRODUCTS } from '../mockData';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { t } = useTranslation();
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/aurawear-hero/1920/1080?grayscale" 
            alt="Hero Background" 
            className="w-full h-full object-cover transform scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="uppercase tracking-[0.5em] text-xs font-semibold mb-6 block">New Collection 2026</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              {t('home.hero')}
            </h1>
            <p className="text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed text-gray-200">
              Discover a new era of apparel where minimalist design meets exceptional craftsmanship.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-none px-12 py-8 text-sm uppercase tracking-widest font-semibold">
                {t('home.cta')}
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black rounded-none px-12 py-8 text-sm uppercase tracking-widest font-semibold transition-all">
                The Story
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-[1px] h-20 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-vertical" />
          </div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="group relative h-[700px] overflow-hidden cursor-pointer"
          >
            <img 
              src="https://picsum.photos/seed/men-collection/1000/1500?grayscale" 
              alt="Men's Collection" 
              className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h2 className="text-4xl font-bold uppercase tracking-widest mb-4">Men</h2>
              <span className="flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="group relative h-[334px] overflow-hidden cursor-pointer"
            >
              <img 
                src="https://picsum.photos/seed/women-collection/1500/1000?grayscale" 
                alt="Women's Collection" 
                 className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
                 referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-2">Women</h2>
                <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="group relative h-[334px] overflow-hidden cursor-pointer"
            >
              <img 
                src="https://picsum.photos/seed/new-collection/1500/1000?grayscale" 
                alt="New Arrivals" 
                 className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
                 referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl font-bold uppercase tracking-widest mb-2">Accessories</h2>
                <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-gray-400 mb-2 block">Curated Selection</span>
              <h2 className="text-4xl font-bold">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="text-sm font-semibold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
