import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Producto, ProductoDocument } from './productos.schema';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class ProductosService {

  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>,
    private readonly categoriasService: CategoriasService,
  ) {}

  async create(dto: CreateProductoDto): Promise<Producto> {
    await this.categoriasService.findOne(dto.categoria);
    const existe = await this.productoModel.findOne({ nombre: dto.nombre });
    if (existe) throw new ConflictException(`Ya existe un producto con el nombre "${dto.nombre}"`);
    const nuevo = new this.productoModel(dto);
    return nuevo.save();
  }

  async findAll(incluirInactivos: boolean, categoria?: string): Promise<Producto[]> {
    const filtro: any = {};
    if (!incluirInactivos) filtro.activo = true;
    if (categoria) filtro.categoria = categoria;
    return this.productoModel.find(filtro).populate('categoria').exec();
  }

  async findOne(id: string): Promise<Producto> {
    const producto = await this.productoModel.findById(id).populate('categoria');
    if (!producto) throw new NotFoundException(`El producto con id ${id} no existe`);
    return producto;
  }

  async update(id: string, dto: UpdateProductoDto): Promise<Producto> {
    if (dto.categoria) await this.categoriasService.findOne(dto.categoria);
    const producto = await this.productoModel.findByIdAndUpdate(id, dto, { new: true });
    if (!producto) throw new NotFoundException(`El producto con id ${id} no existe`);
    return producto;
  }

  async desactivar(id: string): Promise<Producto> {
    const producto = await this.productoModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );
    if (!producto) throw new NotFoundException(`El producto con id ${id} no existe`);
    return producto;
  }

  async remove(id: string): Promise<Producto> {
    const producto = await this.productoModel.findByIdAndDelete(id);
    if (!producto) throw new NotFoundException(`El producto con id ${id} no existe`);
    return producto;
  }
}
