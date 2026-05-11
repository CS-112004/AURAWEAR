import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../mockData';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    
    if (activeCategory !== 'all' && activeCategory !== 'new') {
      result = result.filter(p => p.category === activeCategory);
    } else if (activeCategory === 'new') {
      result = result.filter(p => p.isNewArrival);
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy]);

  const categories = [
    { id: 'all', name: 'All Collection' },
    { id: 'men', name: 'Men' },
    { id: 'women', name: 'Women' },
    { id: 'new', name: 'New Arrivals' },
  ];

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">
          {category ? category : 'Collection'}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap pb-2 border-b-2 transition-all ${
                  activeCategory === cat.id ? 'border-black opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Sort By:</span>
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="h-[400px] flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 font-light mb-6">No items found in this category.</p>
          <Button 
            variant="outline" 
            className="rounded-none uppercase tracking-widest text-xs font-bold"
            onClick={() => setActiveCategory('all')}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
