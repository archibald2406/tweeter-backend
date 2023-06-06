import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'config/validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './typeorm/typeorm.service';
import { DataSource } from 'typeorm';
import { ApiModule } from './api/api.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MailerModule } from '@nest-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtService } from '@nestjs/jwt';
import { JWTService } from './shared/services/jwt.service';
import { AuthMiddleware } from './shared/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/.env`,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return new DataSource(options);
      },
    }),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
        password: 'pass123'
      }
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://testmikhailtweet@gmail.com:bvrlkhnewhifvweuifbwe@smtp.gmail.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          options: {
            strict: true,
          },
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
        },
      }),
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    JwtService,
    JWTService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
