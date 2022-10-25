import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class UserRegistrationInput {
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
