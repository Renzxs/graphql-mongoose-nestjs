import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

// Fields to be exposed/used for querying product graphql
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