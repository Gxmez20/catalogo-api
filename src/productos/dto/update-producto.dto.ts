import { IsString, IsNumber, IsInt, IsMongoId, IsOptional, IsBoolean, Min } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  precio?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsMongoId()
  categoria?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
