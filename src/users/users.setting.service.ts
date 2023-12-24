import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../graphql/models/Users';
import { UsersSetting } from '../graphql/models/UsersSetting';
import { CreateUsersSettingInput } from '../graphql/utils/CreateUsersSettingInput';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSettingService {
  constructor(
    @InjectRepository(UsersSetting)
    private usersSettingsRepository: Repository<UsersSetting>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  getUserSettingById(userId: number) {
    return this.usersSettingsRepository.findOneBy({ userId });
  }

  async createUserSettings(createUsersSettingsInput: CreateUsersSettingInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUsersSettingsInput.userId,
    });

    if (!findUser) throw new Error('user not found');

    const newUserSetting = this.usersSettingsRepository.create(
      createUsersSettingsInput,
    );
    const savedSettings = await this.usersSettingsRepository.save(
      newUserSetting,
    );

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);

    return savedSettings;
  }
}
