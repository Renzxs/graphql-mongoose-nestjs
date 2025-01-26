import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            const product = new this.productModel(createProductDto);
            return product.save();
        } 
        catch(error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return this.productModel.find().exec();
        }
        catch(error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }

    async findOne(id: string): Promise<Product | null> {
        try {
            return this.productModel.findById(id).exec();
        }
        catch(error) {
            throw new Error('Error fetching product: ' + error.message);
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        try {
            const product = this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
            if(!product) {
                throw new NotFoundException(`Product with id ${id} not found`);
            }
            return product;
        }
        catch(error) {
            throw new Error('Error updating product: ' + error.message);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = this.productModel.findByIdAndDelete(id).exec();
            return !!result;
        }
        catch(error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    }
}   
