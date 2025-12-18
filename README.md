# 🛒 E-Commerce Platform

Dự án website buôn bán sản phẩm full-stack sử dụng NextJS, NestJS và MySQL.

## 📋 Mục Lục
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Cài Đặt và Chạy Dự Án](#cài-đặt-và-chạy-dự-án)
- [Tính Năng Chính](#tính-năng-chính)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

---

## 🛠 Công Nghệ Sử Dụng

### Frontend
- **NextJS 14+** - React Framework với App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand/Redux** - State management
- **React Query** - Data fetching và caching
- **Axios** - HTTP client

### Backend
- **NestJS** - Node.js framework
- **TypeScript** - Type safety
- **Prisma** - ORM cho MySQL
- **JWT** - Authentication
- **Passport** - Authentication strategies
- **Class Validator** - Validation
- **Bcrypt** - Password hashing

### Database
- **MySQL 8.0+**
- **Prisma ORM**

---

## 📁 Cấu Trúc Dự Án

```
ecommerce-platform/
│
├── frontend/                      # NextJS Frontend
│   ├── src/
│   │   ├── app/                  # App Router (NextJS 14+)
│   │   │   ├── (auth)/           # Auth routes group
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── (shop)/           # Shop routes group
│   │   │   │   ├── products/
│   │   │   │   ├── cart/
│   │   │   │   ├── checkout/
│   │   │   │   └── orders/
│   │   │   ├── (admin)/          # Admin routes group
│   │   │   │   ├── dashboard/
│   │   │   │   ├── products/
│   │   │   │   ├── orders/
│   │   │   │   └── users/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   │
│   │   ├── components/           # Reusable components
│   │   │   ├── ui/              # UI components (Button, Input, etc.)
│   │   │   ├── layout/          # Layout components (Header, Footer, Sidebar)
│   │   │   ├── product/         # Product components (Card, List, Detail)
│   │   │   └── cart/            # Cart components
│   │   │
│   │   ├── lib/                  # Utilities & configs
│   │   │   ├── api/             # API client setup
│   │   │   ├── utils/           # Helper functions
│   │   │   └── constants/       # Constants
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   ├── store/                # State management (Zustand/Redux)
│   │   ├── types/                # TypeScript types/interfaces
│   │   └── services/             # API services
│   │
│   ├── public/                   # Static files
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                       # NestJS Backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/             # Authentication module
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── strategies/  # JWT, Local strategies
│   │   │   │   ├── guards/      # Auth guards
│   │   │   │   └── dto/         # Data Transfer Objects
│   │   │   │
│   │   │   ├── users/            # Users module
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.module.ts
│   │   │   │   └── dto/
│   │   │   │
│   │   │   ├── products/         # Products module
│   │   │   │   ├── products.controller.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   ├── products.module.ts
│   │   │   │   └── dto/
│   │   │   │
│   │   │   ├── categories/       # Categories module
│   │   │   │   ├── categories.controller.ts
│   │   │   │   ├── categories.service.ts
│   │   │   │   ├── categories.module.ts
│   │   │   │   └── dto/
│   │   │   │
│   │   │   ├── orders/           # Orders module
│   │   │   │   ├── orders.controller.ts
│   │   │   │   ├── orders.service.ts
│   │   │   │   ├── orders.module.ts
│   │   │   │   └── dto/
│   │   │   │
│   │   │   ├── cart/             # Shopping cart module
│   │   │   │   ├── cart.controller.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── cart.module.ts
│   │   │   │   └── dto/
│   │   │   │
│   │   │   └── payments/         # Payment module (optional)
│   │   │       ├── payments.controller.ts
│   │   │       ├── payments.service.ts
│   │   │       ├── payments.module.ts
│   │   │       └── dto/
│   │   │
│   │   ├── prisma/               # Prisma module
│   │   │   ├── prisma.service.ts
│   │   │   └── prisma.module.ts
│   │   │
│   │   ├── common/               # Shared resources
│   │   │   ├── decorators/      # Custom decorators
│   │   │   ├── filters/         # Exception filters
│   │   │   ├── guards/          # Global guards
│   │   │   ├── interceptors/    # Interceptors
│   │   │   └── pipes/           # Validation pipes
│   │   │
│   │   ├── config/               # Configuration files
│   │   │   └── configuration.ts
│   │   │
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   ├── migrations/           # Database migrations
│   │   └── seed.ts              # Database seeding
│   │
│   ├── test/                     # E2E tests
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── package.json
│
├── .env.example                   # Environment variables example
├── docker-compose.yml             # Docker setup (optional)
└── README.md
```

---

## 🚀 Cài Đặt và Chạy Dự Án

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm hoặc yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd ecommerce-platform
```

### 2. Setup Backend

```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
# Cập nhật DATABASE_URL và các biến môi trường khác

# Generate Prisma Client
npx prisma generate

# Chạy migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed

# Start development server
npm run start:dev
```

**Backend .env example:**
```env
DATABASE_URL="mysql://user:password@localhost:3306/ecommerce"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
```

### 3. Setup Frontend

```bash
cd frontend
npm install

# Tạo file .env.local
cp .env.example .env.local
# Cập nhật NEXT_PUBLIC_API_URL

# Start development server
npm run dev
```

**Frontend .env.local example:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Truy Cập Ứng Dụng
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api/docs (Swagger)

---

## ✨ Tính Năng Chính

### Khách Hàng
- ✅ Đăng ký / Đăng nhập / Quên mật khẩu
- ✅ Xem danh sách sản phẩm (tìm kiếm, lọc, phân trang)
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Quản lý giỏ hàng (thêm, sửa, xóa)
- ✅ Đặt hàng và thanh toán
- ✅ Xem lịch sử đơn hàng
- ✅ Quản lý thông tin cá nhân

### Admin
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục (CRUD)
- ✅ Quản lý đơn hàng (xem, cập nhật trạng thái)
- ✅ Quản lý người dùng
- ✅ Thống kê doanh thu
- ✅ Dashboard tổng quan

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         - Đăng ký tài khoản
POST   /api/auth/login            - Đăng nhập
POST   /api/auth/refresh          - Refresh token
GET    /api/auth/profile          - Lấy thông tin user hiện tại
```

### Products
```
GET    /api/products              - Lấy danh sách sản phẩm
GET    /api/products/:id          - Lấy chi tiết sản phẩm
POST   /api/products              - Tạo sản phẩm mới (Admin)
PUT    /api/products/:id          - Cập nhật sản phẩm (Admin)
DELETE /api/products/:id          - Xóa sản phẩm (Admin)
```

### Categories
```
GET    /api/categories            - Lấy danh sách danh mục
GET    /api/categories/:id        - Lấy chi tiết danh mục
POST   /api/categories            - Tạo danh mục (Admin)
PUT    /api/categories/:id        - Cập nhật danh mục (Admin)
DELETE /api/categories/:id        - Xóa danh mục (Admin)
```

### Cart
```
GET    /api/cart                  - Lấy giỏ hàng
POST   /api/cart/items            - Thêm sản phẩm vào giỏ
PUT    /api/cart/items/:id        - Cập nhật số lượng
DELETE /api/cart/items/:id        - Xóa sản phẩm khỏi giỏ
DELETE /api/cart                  - Xóa toàn bộ giỏ hàng
```

### Orders
```
GET    /api/orders                - Lấy danh sách đơn hàng
GET    /api/orders/:id            - Lấy chi tiết đơn hàng
POST   /api/orders                - Tạo đơn hàng mới
PUT    /api/orders/:id/status     - Cập nhật trạng thái (Admin)
```

### Users
```
GET    /api/users                 - Lấy danh sách users (Admin)
GET    /api/users/:id             - Lấy thông tin user (Admin)
PUT    /api/users/:id             - Cập nhật thông tin user
DELETE /api/users/:id             - Xóa user (Admin)
```

---

## 🗄 Database Schema

### User
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(CUSTOMER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  cart      Cart?
  orders    Order[]
}

enum Role {
  CUSTOMER
  ADMIN
}
```

### Product
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?  @db.Text
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  imageUrl    String?
  categoryId  Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  category    Category    @relation(fields: [categoryId], references: [id])
  cartItems   CartItem[]
  orderItems  OrderItem[]
}
```

### Category
```prisma
model Category {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  products  Product[]
}
```

### Cart
```prisma
model Cart {
  id        Int      @id @default(autoincrement())
  userId    Int      @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]
}

model CartItem {
  id        Int      @id @default(autoincrement())
  cartId    Int
  productId Int
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
  
  @@unique([cartId, productId])
}
```

### Order
```prisma
model Order {
  id         Int         @id @default(autoincrement())
  userId     Int
  total      Decimal     @db.Decimal(10, 2)
  status     OrderStatus @default(PENDING)
  createdAt  DateTime    @default(now())
  updatedAt  DateTime    @updatedAt
  
  user       User        @relation(fields: [userId], references: [id])
  items      OrderItem[]
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  productId Int
  quantity  Int
  price     Decimal @db.Decimal(10, 2)
  
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
  
  @@unique([orderId, productId])
}
```

---

## 📝 Ghi Chú

- Sử dụng Prisma Studio để quản lý database: `npx prisma studio`
- API documentation được generate tự động bằng Swagger tại `/api/docs`
- Tất cả API endpoints đều được bảo vệ bằng JWT (trừ login/register)
- Upload ảnh sản phẩm có thể tích hợp với Cloudinary hoặc AWS S3

---

## 🔐 Security Best Practices

- ✅ Password được hash bằng bcrypt
- ✅ JWT token với expiration time
- ✅ Input validation với class-validator
- ✅ SQL Injection prevention với Prisma ORM
- ✅ CORS configuration
- ✅ Rate limiting (nên implement)
- ✅ Helmet.js cho security headers

---

## 📚 Tài Liệu Tham Khảo

- [NextJS Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc)

---

**Chúc bạn code vui vẻ! 🚀**
