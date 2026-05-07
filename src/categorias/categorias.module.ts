import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { Categoria, CategoriaSchema } from './categorias.schema';
import { Producto, ProductoSchema } from '../productos/productos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriaSchema },
      { name: Producto.name, schema: ProductoSchema },
    ]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [CategoriasService],
})
export class CategoriasModule {}
