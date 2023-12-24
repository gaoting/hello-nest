import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../graphql/models/Users';
import { CreateUserInput } from '../graphql/utils/CreateUsersInput';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersResolver: Repository<Users>,
  ) {}

  getUsers() {
    return this.usersResolver.find({ relations: ['settings'] });
  }

  getUserById(id: number) {
    return this.usersResolver.findOne({
      where: { id },
      relations: ['settings'],
    });
  }

  createUsers(createUserInput: CreateUserInput) {
    const newUser = this.usersResolver.create(createUserInput);
    return this.usersResolver.save(newUser);
  }
}
