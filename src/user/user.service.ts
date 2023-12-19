import { Injectable } from '@nestjs/common';
import {User} from './entities/user.entity'
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly usersRepository:Repository<User>){}

async getList():Promise<User[]> {
  return await this.usersRepository.find()
}

async getUserById(id):Promise<User>{
  return await this.usersRepository.findOne({where:{id:id}})
}





}
