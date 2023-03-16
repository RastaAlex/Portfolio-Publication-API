import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { CommentService } from './comment.service';
  import { CreateCommentDto } from './dtos/comment.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  
  @Controller('images/:imageId/comments')
  export class CommentController {
    constructor(private readonly commentService: CommentService) {}
  
    @Get()
    findAll(@Param('imageId') imageId: number) {
      return this.commentService.findAll(imageId);
    }
  
    @Get(':commentId')
    findOne(@Param('imageId') imageId: number, @Param('commentId') commentId: number) {
      return this.commentService.findOne(commentId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    create(
      @Param('imageId') imageId: number,
      @Body() createCommentDto: CreateCommentDto,
    ) {
      return this.commentService.create(imageId, createCommentDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    delete(@Param('imageId') imageId: number, @Param('commentId') commentId: number) {
      return this.commentService.delete(commentId);
    }
  }