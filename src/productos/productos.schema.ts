import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductoDocument = Producto & Document;

@Schema({ timestamps: true })
export class Producto {
  @Prop({ required: true, unique: true })
  nombre!: string;

  @Prop({ required: true, min: 0.01 })
  precio!: number;

  @Prop({ required: true, min: 0 })
  stock!: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Categoria' })
  categoria!: Types.ObjectId;

  @Prop({ default: true })
  activo!: boolean;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
