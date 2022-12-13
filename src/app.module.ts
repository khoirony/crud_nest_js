import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './Entities/user.entity';
import { UserService } from './user/user.service';
import entities from 'src';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}