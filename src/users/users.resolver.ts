import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UsersSettingService } from './users.setting.service';
import { CreateUserInput } from '../graphql/utils/CreateUsersInput';
import { Users } from '../graphql/models/Users';

export let incrementalId = 3;

@Resolver((of) => Users)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private usersSettingService: UsersSettingService,
  ) {}

  @Mutation((returns) => Users)
  createUsers(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUsers(createUserData);
  }

  @Query(() => [Users])
  getUsers() {
    return this.usersService.getUsers();
  }

  @Query((returns) => Users, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getUserById(id);
  }
}
