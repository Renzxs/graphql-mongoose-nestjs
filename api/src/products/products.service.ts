import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = new this.productModel(createProductDto);
        return product.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const result = this.productModel.findByIdAndDelete(id).exec();
        return !!result;
    }
}   
