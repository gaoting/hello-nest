import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  bookName: string;

  @Column()
  @Field()
  desc: string;

  @Column()
  @Field()
  author: string;

  @CreateDateColumn()
  @Field()
  createTime: Date;
}
