import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { RobotsOfCustomersModel } from './robots-of-customers.model';

@ObjectType()
@Entity('Robots')
export class RobotsModel {
  @Field()
  @PrimaryColumn({ name: 'serial_number', length: 5, nullable: false })
  @OneToOne(
    (type) => RobotsOfCustomersModel,
    (robots: RobotsOfCustomersModel) => robots.robotSerialNumber,
  )
  serialNumber: string;
}
