import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  public readonly id: string;

  @Expose()
  @Column({
    readonly: true,
    unique: true,
    length: 40,
  })
  public readonly username!: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  public createTime: number;

  @UpdateDateColumn({ type: 'timestamp' })
  @Expose()
  public updateTime: number;

  /** 密码验证 */
  @Column({ nullable: true })
  @Expose()
  public hash!: string;

  /** 密码盐 */
  @Column({ nullable: true })
  @Expose()
  public readonly salt!: string;

  @Column({
    unique: false,
    default: '',
  })
  public readonly email!: string;
}
