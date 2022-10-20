import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserCreateDto {
  id: number;

  @Length(2, 255)
  @IsNotEmpty()
  name: string;

  @Length(2, 255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(2, 20)
  @IsNotEmpty()
  phone: string;

  @Length(8, 255)
  @IsNotEmpty()
  password: string;
}
