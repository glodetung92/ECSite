import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client'; // Import User type
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByPasswordResetToken(token: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { passwordResetToken: token },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }


}
