import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { Image } from './image.entity';
import { CreateImageDto } from './dtos/image.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async findAll(): Promise<Image[]> {
    return this.imageService.findAll();
  }

  @Get(':imageId')
  async findOne(@Param('imageId') imageId: number): Promise<Image | null> {
    return this.imageService.findOne(imageId);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post('portfolio/:portfolioId')
  async create(
    @Param('portfolioId') portfolioId: number,
    @Body() createImageDto: CreateImageDto,
  ): Promise<Image> {
    return this.imageService.create(portfolioId, createImageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':imageId')
  async delete(@Param('imageId') imageId: number): Promise<void> {
    return this.imageService.delete(imageId);
  }
}
