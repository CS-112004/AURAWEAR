export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'unisex';
  subcategory: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  address?: string;
  orderHistory: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
  shippingAddress: string;
  trackingNumber?: string;
}
