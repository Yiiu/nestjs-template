import { Exclude, Expose } from 'class-transformer';
import { IsEmail, Length, IsString } from 'class-validator';

@Exclude()
export class CreateUserDto {
  /**
   * 邮箱
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsEmail()
  @Expose()
  public readonly email!: string;

  /**
   * 用户名
   */
  @Length(1, 15)
  @IsString()
  @Expose()
  public readonly username!: string;

  /**
   * 密码
   *
   * @type {string}
   * @memberof CreateUserDto
   */
  @Length(6, 24)
  @IsString()
  @Expose()
  public readonly password!: string;
}
