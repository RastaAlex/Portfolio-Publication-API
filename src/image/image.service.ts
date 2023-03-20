import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';
import { Portfolio } from '@portfolio/portfolio.entity';
import { CreateImageDto } from './dtos/image.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async findAll(): Promise<Image[]> {
    return this.imageRepository.find({ relations: ['portfolio'] });
  }

  async findOne(imageId: number): Promise<Image | null> {
    return this.imageRepository.findOne({
      where: { id: imageId },
      relations: ['portfolio'],
    });
  }

  async create(
    portfolioId: number,
    createImageDto: CreateImageDto,
  ): Promise<Image> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: portfolioId },
    });

    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const image = this.imageRepository.create(createImageDto);
    image.portfolio = portfolio;

    return this.imageRepository.save(image);
  }

  async delete(imageId: number): Promise<void> {
    await this.imageRepository.delete(imageId);
  }
}
