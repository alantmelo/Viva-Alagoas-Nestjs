import { IsJWT, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsStrongPassword({
    minLength: 3,
  })
  password: string;
  @IsJWT()
  token: string;
}
