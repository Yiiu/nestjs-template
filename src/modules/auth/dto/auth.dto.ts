import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Exclude()
export class EmailRegisterDto {
  @IsString()
  @Expose()
  public readonly username!: string;

  @IsEmail()
  @Expose()
  public readonly email!: string;

  @IsString()
  @Expose()
  public readonly password!: string;
}
