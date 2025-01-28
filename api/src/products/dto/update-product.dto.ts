import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateProductDto } from './create-product.dto';

// Data Transfer Object (DTO) / params types for update product mutation
@InputType()
export class UpdateProductDto extends PartialType(CreateProductDto) {
    @Field()
    id: string;
}