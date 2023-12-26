import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookInput: CreateBookInput): Promise<Book> {
    return await this.booksRepository.save(createBookInput);
  }

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return await this.booksRepository.findOneBy({ id });
  }

  async update(id: number, updateBookInput: UpdateBookInput) {
    const book = await this.booksRepository.findOneBy({ id });
    if (book) {
      await this.booksRepository.update({ id }, updateBookInput);
      return {
        code: 0,
        data: '',
        msg: 'update 成功',
      };
    } else {
      return {
        code: 0,
        data: '',
        msg: 'update 失败',
      };
    }
  }

  async remove(id: number) {
    const res = await this.booksRepository.delete({ id });
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
}
