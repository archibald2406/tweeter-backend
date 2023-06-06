import {
  Controller,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './interface/registration-status.interface';
import { RegistrationEmailCodeDto } from '../user/dto/registration-email-code.dto';
import { SignInDto } from '../user/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('sign-up')
  public async signUp(@Body() createUserDto: CreateUserDto) {
    const result: RegistrationStatus = await this.authService.signUp(
      createUserDto,
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  @Post('check-email-code')
  public async checkEmailCode(@Body() registrationEmailCodeDto: RegistrationEmailCodeDto) {
    const result: RegistrationStatus = await this.authService.checkEmailCode(
      registrationEmailCodeDto,
    );

    if (!result.success) {
      throw new BadRequestException(result.message);
    }
    return result;
  }

  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto) {
    const result = await this.authService.signIn(signInDto);
    return result;
  }
}
