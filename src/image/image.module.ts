import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Image } from './image.entity';
import { Portfolio } from '../portfolio/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Portfolio])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}