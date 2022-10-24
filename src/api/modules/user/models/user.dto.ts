import { IsEmail, IsNotEmpty } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;
}
