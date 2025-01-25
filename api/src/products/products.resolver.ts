import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver(() =>  Product)
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}
    
    @Mutation(() => Product, { name: 'createProduct' })
    createProduct(@Args('createProductDto') createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Query(() => [Product], { name: 'products'})
    findAll() {
        return this.productsService.findAll();
    }

    @Query(() => Product, { name: 'product' })
    findOne(@Args('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Mutation(() => Product)
    updateProduct(@Args('updateProductDto') updateProductDto: UpdateProductDto) {
        return this.productsService.update(updateProductDto.id, updateProductDto);
    }

    @Mutation(() => Boolean)
    deleteProduct(@Args('id') id: string) {
        return this.productsService.delete(id);
    }
}
