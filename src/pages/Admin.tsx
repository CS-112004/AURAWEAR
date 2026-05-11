import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Plus, Trash2, Edit2, LayoutDashboard, Package, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../mockData';
import { Product } from '../types';

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'customers'>('inventory');
  
  // In a real app, this would be fetched from Firestore
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Simple hardcoded admin check for demo purposes
  // In production, use Firebase custom claims or a Firestore 'admins' collection
  const isAdmin = user?.email === 'shettychethans57@gmail.com';

  if (!isAdmin) {
    return (
      <div className="pt-40 h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold uppercase tracking-tight mb-4 text-red-600">Access Denied</h1>
        <p className="text-gray-500 font-light max-w-sm mb-10">
          Only authorized administrators can access the AURAWEAR command center.
        </p>
        <Button 
          onClick={() => window.history.back()}
          className="rounded-none bg-black text-white px-12 py-6 uppercase tracking-widest font-bold"
        >
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-2 block">Control Center</span>
          <h1 className="text-4xl font-bold uppercase tracking-tight">Admin Dashboard</h1>
        </div>
        <Button className="rounded-none bg-black text-white uppercase tracking-widest font-bold px-8 py-6 flex gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'inventory', name: 'Inventory', icon: Package },
            { id: 'orders', name: 'Orders', icon: LayoutDashboard },
            { id: 'customers', name: 'Customers', icon: Users },
            { id: 'settings', name: 'Store Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 p-6 border transition-all text-left ${
                activeTab === tab.id 
                  ? 'bg-black text-white border-black shadow-lg translate-x-1' 
                  : 'bg-white border-gray-100 hover:border-black text-gray-400 hover:text-black'
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          <div className="bg-white border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold uppercase tracking-tight">{activeTab} Management</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-400">{products.length} total products in catalog</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 italic font-light text-xs text-gray-400">
                    <th className="pb-4 pt-0 px-2 uppercase tracking-widest font-normal">Product</th>
                    <th className="pb-4 pt-0 px-2 uppercase tracking-widest font-normal text-center">Price</th>
                    <th className="pb-4 pt-0 px-2 uppercase tracking-widest font-normal text-center">Stock</th>
                    <th className="pb-4 pt-0 px-2 uppercase tracking-widest font-normal text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="py-6 px-2">
                        <div className="flex items-center gap-4">
                          <img src={p.images[0]} alt="" className="w-12 h-16 object-cover bg-gray-100" />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest group-hover:underline cursor-pointer">{p.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">{p.category} / {p.subcategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-2 text-center font-bold text-sm tracking-tight text-gray-800">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="py-6 px-2 text-center font-mono text-xs text-gray-500">
                        {p.stock} units
                      </td>
                      <td className="py-6 px-2 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 text-blue-600">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
