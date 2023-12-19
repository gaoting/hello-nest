import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module(
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database:'auth',
      entities: [__dirname+'/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
  {
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}