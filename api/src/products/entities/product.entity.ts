import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
    @Field(() => ID)
    id: string;

    @Field() 
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;
}