import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity('GPS_points')
export class GpsPointModel {
    @Field()
    @PrimaryGeneratedColumn({ name: 'id', type: "int" })
    id: number;

    @Field()
    @Column({ name: 'quality', type: "int" })
    quality: number;

    @Field()
    @Column({ name: 'latitude', type: "decimal", precision: 20, scale: 18, nullable: false })
    latitude: number;

    @Field()
    @Column({ name: 'longitude', type: "decimal", precision: 20, scale: 18, nullable: false })
    longitude: number;
}