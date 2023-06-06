import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegistrationEmailCodeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  emailCode: string;
}
