import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RobotsOfCustomersModel as Robots } from '../../robot/model/robots-of-customers.model';
import { Md5 } from 'ts-md5';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@ObjectType()
@Entity('Customers')
export class UserModel {
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

  @Field((type) => [Robots], { nullable: true })
  @OneToMany((type) => Robots, (robot) => robot.user)
  robots: Robots[];

  @BeforeInsert() hashPassword(): void {
    this.password = Md5.hashStr(this.password);
  }
}

@InputType()
export class UserInput {
  @Field()
  @Length(2, 255)
  @IsNotEmpty()
  name: string;

  @Field()
  @Length(2, 255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @Length(2, 20)
  @IsNotEmpty()
  phone: string;

  @Field()
  @Length(8, 255)
  @IsNotEmpty()
  password: string;
}

@InputType()
export class UserLoginInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
