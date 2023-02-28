import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  @IsNotEmpty()
  login: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
