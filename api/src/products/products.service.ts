import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    // Injects product model in this service
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    // Create product service
    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            const product = new this.productModel(createProductDto);
            return product.save();
        } 
        catch(error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    // Fetch all products data from the database
    async findAll(): Promise<Product[]> {
        try {
            return this.productModel.find().exec();
        }
        catch(error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }

    // Fetch specific product data in the database by id
    async findOne(id: string): Promise<Product | null> {
        try {
            return this.productModel.findById(id).exec();
        }
        catch(error) {
            throw new Error('Error fetching product: ' + error.message);
        }
    }

    // Update/Modify specific product data in the database by id
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

    // Delete specific product data in the database by id
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
