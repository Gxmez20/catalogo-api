import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { Producto, ProductoSchema } from './productos.schema';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }]),
    CategoriasModule,
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
