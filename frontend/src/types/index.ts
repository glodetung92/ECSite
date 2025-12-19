export interface User {
  id: number;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categoryId: number;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  userId: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
}
