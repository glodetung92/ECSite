import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto, RegisterAuthDto, ResetPasswordDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client'; // Import Prisma to use its types

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterAuthDto) {
    const userExists = await this.usersService.findByEmail(registerDto.email);

    if (userExists) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const newUser = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) { // Use Prisma.User type here
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string; resetToken: string }> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      // To prevent email enumeration attacks, we don't reveal that the user does not exist.
      // In a real app, you'd log this attempt but return a generic success message.
      throw new UnauthorizedException('If a matching account exists, a password reset link has been sent.');
    }

    // Generate a raw token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash the token before saving to the database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 minutes

    await this.usersService.update(user.id, {
      passwordResetToken: hashedToken,
      passwordResetExpires: resetExpires,
    });

    // In a real app, you would email the `resetToken` (the raw, unhashed version) to the user.
    // For this example, we'll return it in the response for demonstration purposes.
    console.log(`Password reset token for ${user.email}: ${resetToken}`);
    return {
      message:
        'If a matching account exists, a password reset link has been sent.',
      resetToken: resetToken, // For demonstration only
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetPasswordDto.token)
      .digest('hex');

    const user = await this.usersService.findByPasswordResetToken(hashedToken);

    if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
      throw new UnauthorizedException('Password reset token is invalid or has expired.');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);

    await this.usersService.update(user.id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    });

    return { message: 'Password has been successfully reset.' };
  }
}
