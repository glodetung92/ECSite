#!/bin/bash

echo "🚀 Creating NextJS Frontend..."

# Tạo project với tất cả options
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm

cd frontend

echo "📦 Installing dependencies..."

# Cài đặt dependencies
pnpm install axios zustand
pnpm install @tanstack/react-query
pnpm install react-hook-form zod @hookform/resolvers
pnpm install lucide-react
pnpm install clsx tailwind-merge

echo "📁 Creating folder structure..."

# Tạo cấu trúc thư mục
mkdir -p src/app/\(auth\)/{login,register}
mkdir -p src/app/\(shop\)/{products,cart,checkout,orders}
mkdir -p src/app/\(admin\)/{dashboard,products,orders,users}

mkdir -p src/components/{ui,layout,product,cart}
mkdir -p src/lib/{api,utils,constants}
mkdir -p src/hooks
mkdir -p src/store
mkdir -p src/types
mkdir -p src/services

# Tạo file utils cơ bản
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# Tạo file API client
cat > src/lib/api/client.ts << 'EOF'
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
EOF

# Tạo file .env.local
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

# Tạo file types
cat > src/types/index.ts << 'EOF'
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
EOF

echo "✅ Frontend setup completed!"
echo "📝 Next steps:"
echo "   cd frontend"
echo "   pnpm run dev"
