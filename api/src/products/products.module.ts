import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    // Registered the schemas will be used in this module
    MongooseModule.forFeature([{ 
      name: Product.name,  // Mongodb model name
      schema: ProductSchema // Specifies the schema that will be used for the model
    }])
  ],
  providers: [
    ProductsResolver, 
    ProductsService
  ]
})
export class ProductsModule {}
