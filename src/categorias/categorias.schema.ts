import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoriaDocument = Categoria & Document;

@Schema({ timestamps: true })
export class Categoria {
  @Prop({ required: true, unique: true })
  nombre!: string;

  @Prop({ maxlength: 200 })
  descripcion?: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
