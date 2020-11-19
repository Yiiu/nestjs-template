import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 获取加密后的密码
   *
   * @param {string} password
   * @returns
   * @memberof UsersService
   */
  public getPassword(password: string) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 20, 32, 'sha512')
      .toString('hex');
    return {
      salt,
      hash,
    };
  }

  async isRegister(email, username, error = true) {
    const [nameData, userData] = await Promise.all([
      this.userRepository.findOne({ username }),
      this.userRepository.findOne({ email }),
    ]);
    if (nameData) {
      if (error) {
        throw new BadRequestException('username_exists');
      }
      return 'username';
    }
    if (userData) {
      if (error) {
        throw new BadRequestException('email_exists');
      }
      return 'email';
    }
    return false;
  }

  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ username });
  }

  async createUser(data: CreateUserDto) {
    const { salt, hash } = this.getPassword(data.password);
    const newUser = this.userRepository.create({
      salt,
      hash,
      ...data,
      username: data.username,
      email: data.email,
    });
    await this.userRepository
      .createQueryBuilder('user')
      .insert()
      .into(UserEntity)
      .values({ ...newUser })
      .execute();
    return newUser;
  }
}
