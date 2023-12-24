import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../graphql/models/Users';
import { UsersSettingService } from './users.setting.service';
import { UsersSetting } from '../graphql/models/UsersSetting';
import { UsersSettingsResolver } from '../graphql/resolvers/UsersSettingsResolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UsersSetting])],
  providers: [
    UsersResolver,
    UsersService,
    UsersSettingService,
    UsersSettingsResolver,
  ],
})
export class UsersModule {}
