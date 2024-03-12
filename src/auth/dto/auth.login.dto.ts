import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword({
    minLength: 3,
  })
  password: string;
}
