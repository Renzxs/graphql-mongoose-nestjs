import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;
}