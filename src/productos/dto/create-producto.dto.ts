import { IsString, IsNumber, IsInt, IsMongoId, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre!: string;

  @IsNumber()
  @Min(0.01)
  precio!: number;

  @IsInt()
  @Min(0)
  stock!: number;

  @IsMongoId()
  categoria!: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
