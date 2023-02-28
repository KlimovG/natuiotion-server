import {Field, ObjectType} from "@nestjs/graphql";
import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {FieldModel} from "./field.model";
import {GpsPointModel} from "./gps-point.model";

@ObjectType()
@Entity('Fields_corners')
export class FieldCornerModel {
    @Field()
    @PrimaryGeneratedColumn({ name: 'id', type: "int" })
    id: number;

    @Field(()=>FieldModel)
    @ManyToOne(() => FieldModel, (field) => field.id, {
        eager: true,
    })
    @JoinColumn({name: 'field_id'})
    field: FieldModel

    @Field()
    @Column({name: 'field_id'})
    fieldId: number;

    @Field()
    @Column({ name: 'gps_point_id' })
    gpsPointId: number;

    @Field(()=> GpsPointModel)
    @OneToOne(() => GpsPointModel, {
        eager: true,
    })
    @JoinColumn({name: 'gps_point_id'})
    gpsPoint: GpsPointModel


}