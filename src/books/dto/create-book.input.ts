import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  bookName: string;

  @Field({ nullable: true })
  desc: string;

  @Field({ nullable: true })
  author: string;
}
