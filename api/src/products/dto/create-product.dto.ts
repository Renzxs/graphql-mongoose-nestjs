import { Field, Float, InputType } from '@nestjs/graphql';

// Data Transfer Object (DTO) / params types for create product mutation
@InputType()
export class CreateProductDto {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;
}