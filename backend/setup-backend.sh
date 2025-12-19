#!/bin/bash

# Tạo modules
npx @nestjs/cli g module auth
npx @nestjs/cli g module users
npx @nestjs/cli g module products
npx @nestjs/cli g module categories
npx @nestjs/cli g module orders
npx @nestjs/cli g module cart
npx @nestjs/cli g module prisma

# Tạo controllers và services
npx @nestjs/cli g controller auth
npx @nestjs/cli g service auth
npx @nestjs/cli g controller users
npx @nestjs/cli g service users
npx @nestjs/cli g controller products
npx @nestjs/cli g service products
npx @nestjs/cli g controller categories
npx @nestjs/cli g service categories
npx @nestjs/cli g controller orders
npx @nestjs/cli g service orders
npx @nestjs/cli g controller cart
npx @nestjs/cli g service cart
npx @nestjs/cli g service prisma

# Tạo thư mục common
mkdir -p src/common/{decorators,filters,guards,interceptors,pipes}
mkdir -p src/config

# Cài đặt dependencies
pnpm install @prisma/client @nestjs/passport passport passport-jwt passport-local @nestjs/jwt bcrypt class-validator class-transformer @nestjs/config

pnpm install -D prisma @types/passport-jwt @types/passport-local @types/bcrypt

# Khởi tạo Prisma
npx prisma init

echo "✅ Backend setup completed!"
