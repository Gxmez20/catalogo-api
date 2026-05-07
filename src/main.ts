import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const mensajes = errors.map((e) => Object.values(e.constraints || {}).join(', '));
        return new BadRequestException(mensajes);
      },
    }),
  );

  mongoose.plugin((schema) => {
    schema.pre('findOne', function () {
      const id = this.getQuery()._id;
      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`El id "${id}" no es válido`);
      }
    });
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
