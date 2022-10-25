import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
