import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/modules/users/users.service';
import { EmailRegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user) {
      const hash = crypto
        .pbkdf2Sync(password, user.salt, 20, 32, 'sha512')
        .toString('hex');
      if (hash === user.hash) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async emailRegister(data: EmailRegisterDto) {
    await this.usersService.isRegister(data.email, data.username);

    const newUser = await this.usersService.createUser({
      ...data,
    });
    return newUser;
  }
}
