import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  // @IsEmail()
  // @IsNotEmpty()
  // email: string;
}
