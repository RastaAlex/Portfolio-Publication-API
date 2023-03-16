import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Image } from '../image/image.entity';
import { CreateCommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(imageId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    const image = await this.imageRepository.findOne({ where: { id: imageId } });

    if (!image) {
      throw new Error('Image not found');
    }

    const comment = this.commentRepository.create({ content: createCommentDto.text });
    comment.image = image;
    return this.commentRepository.save(comment);
  }

  async findAll(imageId: number): Promise<Comment[]> {
    return this.commentRepository.find({ where: { image: { id: imageId } }, relations: ['image'] });
  }

  async findOne(commentId: number): Promise<Comment> {
    return this.commentRepository.findOne({ where: { id: commentId }, relations: ['image'] });
  }

  async delete(commentId: number): Promise<void> {
    await this.commentRepository.delete(commentId);
  }
}