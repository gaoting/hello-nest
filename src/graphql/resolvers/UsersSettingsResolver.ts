import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersSetting } from '../models/UsersSetting';
import { CreateUsersSettingInput } from '../utils/CreateUsersSettingInput';
import { UsersSettingService } from '../../users/users.setting.service';

@Resolver()
export class UsersSettingsResolver {
  constructor(private usersSettingService: UsersSettingService) {}

  @Mutation((returns) => UsersSetting)
  async createUserSettings(
    @Args('createUsersSettingInput')
    createUsersSettingInput: CreateUsersSettingInput,
  ) {
    const userSetting = await this.usersSettingService.createUserSettings(
      createUsersSettingInput,
    );
    return userSetting;
  }
}
