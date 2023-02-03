import { Field, ObjectType } from '@nestjs/graphql';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
// import { RobotModel as Robots } from '../../robot/models/robot.model';
import { Md5 } from 'ts-md5';
import { Logger } from '@nestjs/common';

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

  // @Field((type) => [Robots], { nullable: true })
  // @OneToMany((type) => Robots, (robot) => robot.user)
  // robots: Robots[];
  @AfterInsert()
  logInsert() {
    this.logger.log('Inserted User with id: ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    this.logger.log('Updated User with id: ', this.id);
  }
  @AfterRemove()
  logRemove() {
    this.logger.log('Removed User with id: ', this.id);
  }
}
