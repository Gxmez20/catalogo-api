import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.productosService.create(dto);
  }

  @Get()
  findAll(
    @Query('incluirInactivos') incluirInactivos: string,
    @Query('categoria') categoria?: string,
  ) {
    return this.productosService.findAll(incluirInactivos === 'true', categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductoDto) {
    return this.productosService.update(id, dto);
  }

  @Patch(':id/desactivar')
  desactivar(@Param('id') id: string) {
    return this.productosService.desactivar(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productosService.remove(id);
  }
}
