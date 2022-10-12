import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { RobotsOfCustomersModel as Robots } from '../../robot/model/robots-of-customers.model';

@ObjectType()
@Entity('Customers')
export class CustomerModel {
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
  hashPWD: string;

  @Field((type) => [Robots], { nullable: true })
  robots: Robots[];

  @OneToMany((type) => Robots, (robot) => robot.customer)
  robotsConnection: Robots[];
}
