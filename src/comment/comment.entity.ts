import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Image } from '../image/image.entity';
  
  @Entity('comments')
  export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    content: string;
  
    @ManyToOne(() => Image, (image) => image.comments, {
      onDelete: 'CASCADE',
    })
    image: Image;
  }