import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Portfolio } from '../portfolio/portfolio.entity';
  import { Comment } from '../comment/comment.entity';
  
  @Entity('images')
  export class Image {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @Column()
    url: string;
  
    @ManyToOne(() => Portfolio, (portfolio) => portfolio.images, {
      onDelete: 'CASCADE',
    })
    portfolio: Portfolio;
  
    @OneToMany(() => Comment, (comment) => comment.image, {
      cascade: true,
    })
    comments: Comment[];
  }