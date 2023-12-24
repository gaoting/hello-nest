import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository, createQueryBuilder, WhereExpression } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getList(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserById(id): Promise<User> {
    return await this.usersRepository.findOne({ where: { id: id } });
  }

  async addUser(body): Promise<User> {
    return await this.usersRepository.save(body);
  }

  async updateUser(user): Promise<string> {
    await this.usersRepository.update({ id: user.id }, user);
    return '更新成功';
  }

  async deleteUser(params): Promise<object> {
    const res = await this.usersRepository.delete({ id: params.id });
    if (res.affected > 0) {
      return {
        code: 0,
        data: '',
        msg: '删除成功',
      };
    } else {
      return {
        code: 0,
        data: '',
        msg: '删除失败',
      };
    }
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<[User[], number]> {
    const [users, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return [users, total];
  }

  async findByConditions(conditions: Partial<User>): Promise<User[]> {
    const qb = this.usersRepository
      .createQueryBuilder('user')
      .where(conditions);

    return qb.getMany();
  }
}
