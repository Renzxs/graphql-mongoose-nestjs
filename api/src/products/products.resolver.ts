import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Resolver(() =>  Product)
export class ProductsResolver {
    // Injects ProductsService in this class to be used in the following resolvers
    constructor(private readonly productsService: ProductsService) {}
    
    // "mutation createProduct" - Resolver for creating products
    @Mutation(() => Product, { name: 'createProduct' })
    createProduct(@Args('createProductDto') createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    // "query products" - Resolver for fetching products
    @Query(() => [Product], { name: 'products' })
    findAll() {
        return this.productsService.findAll();
    }

    // "query product" - Resolver for fetching single product
    @Query(() => Product, { name: 'product' })
    findOne(@Args('id') id: string) {
        return this.productsService.findOne(id);
    }

    // "mutation updateProduct" - Resolver for updating product by id
    @Mutation(() => Product, { name: 'updateProduct' })
    updateProduct(@Args('updateProductDto') updateProductDto: UpdateProductDto) {
        return this.productsService.update(updateProductDto.id, updateProductDto);
    }

    // "mutation deleteProduct" - Resolver for deleting product by id
    @Mutation(() => Boolean, { name: 'deleteProduct' })
    deleteProduct(@Args('id') id: string) {
        return this.productsService.delete(id);
    }
}
