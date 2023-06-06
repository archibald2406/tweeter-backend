import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegistrationStatus } from './interface/registration-status.interface';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nest-modules/mailer';
import { randomBytes } from 'crypto';
import { RegistrationEmailCodeDto } from '../user/dto/registration-email-code.dto';
import { SignInDto } from '../user/dto/sign-in.dto';
import { comparePasswords } from '../user/utils/user.util';
import { v4 as uuid } from 'uuid';
import { JWTPayload, JWTService } from 'src/shared/services/jwt.service';
import { SignInStatus } from './interface/sign-in-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JWTService,
    @InjectRedis() private readonly redis: Redis,
    private readonly mailerService: MailerService,
  ) {}

  async signUp({ username, email, password, fullName }: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'email code sent',
    };

    try {
      const user = await this.userService.findgetByIdUserNameEmail({ username, email });
      if (user) {
        throw new BadRequestException('User already exists');
      }

      const emaiCode = randomBytes(2).join('');
      await this.redis.set(email, JSON.stringify({
        username,
        email,
        password: await bcrypt.hash(password, 10),
        fullName,
        emaiCode,
      }), 'EX', 10);

      const message = {
        to: email,
        from: 'testmikhailtweet@gmail.com',
        subject: 'Tweeter registration',
        text: `Email code: ${emaiCode}`,
        html: '<b>welcome</b>',
      };

      this.mailerService
        .sendMail(message)
        .then(console.log)
        .catch(() => {});
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async checkEmailCode({ email, emailCode }: RegistrationEmailCodeDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user signed up',
    };

    try {
      const user = JSON.parse(await this.redis.get(email));
      console.log('user from redis', user);
      
      if (user?.emaiCode !== emailCode) {
        throw new BadRequestException('Email code is not equal to sent code');
      }
      await this.userService.create(user);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async signIn({ email, password }: SignInDto): Promise<SignInStatus> {
    const user = await this.userService.findgetByIdUserNameEmail({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const userPassword = user.password;
    const isPasswordCorrect = await comparePasswords(password, userPassword);
    if (!isPasswordCorrect) {
      throw new BadRequestException('Password is not correct');
    }
    const refreshToken = uuid();
    const jwtPayload: JWTPayload = {
      ['refresh-token']: refreshToken,
      email: user.email,
      userId: user.id,
    };
    const accessToken = this.jwtService.createToken(jwtPayload);

    return {
      ['access-token']: accessToken,
      jwtPayload,
    };
  }
}
