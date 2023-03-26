import { Field, ObjectType } from '@nestjs/graphql';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Logger } from '@nestjs/common';
import { Role } from '../../../../core/modules/auth/decorators/role.decorator';

@ObjectType()
@Entity('Customers')
export class UserModel {
  private readonly logger = new Logger('AuthService');

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255, nullable: false })
  name: string;

  @Field()
  @Column({ length: 255, nullable: false })
  email: string;

  @Field()
  @Column({ length: 20, nullable: false })
  @Unique('UC_Customer', ['email'])
  phone: string;

  @Field()
  @Column({ name: 'hash_pwd', length: 20, nullable: false })
  password: string;

  @Column({ name: 'hash_rt', length: 20, nullable: true })
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @AfterInsert()
  logInsert() {
    this.logger.log(`Inserted User with id: ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    this.logger.log(`Updated User with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    this.logger.log(`Removed User with id: ${this.id}`);
  }
}
