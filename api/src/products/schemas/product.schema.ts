import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Product Schema for mongodb
@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;
}

// Generates the product schema in the database
export const ProductSchema = SchemaFactory.createForClass(Product); 