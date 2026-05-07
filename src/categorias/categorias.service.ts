import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria, CategoriaDocument } from './categorias.schema';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name) private categoriaModel: Model<CategoriaDocument>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<Categoria> {
    const existe = await this.categoriaModel.findOne({ nombre: dto.nombre });
    if (existe) throw new ConflictException(`Ya existe una categoría con el nombre "${dto.nombre}"`);
    const nueva = new this.categoriaModel(dto);
    return nueva.save();
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.find().exec();
  }

  async findOne(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findById(id);
    if (!categoria) throw new NotFoundException(`La categoría con id ${id} no existe`);
    return categoria;
  }

  async update(id: string, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriaModel.findByIdAndUpdate(id, dto, { new: true });
    if (!categoria) throw new NotFoundException(`La categoría con id ${id} no existe`);
    return categoria;
  }

  async remove(id: string): Promise<Categoria> {
    const categoria = await this.categoriaModel.findByIdAndDelete(id);
    if (!categoria) throw new NotFoundException(`La categoría con id ${id} no existe`);
    return categoria;
  }
}
