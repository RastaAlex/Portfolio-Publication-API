import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Portfolio } from '@portfolio/portfolio.entity';
import { Comment } from './comment.interface';

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

  @Column({ type: 'json' })
    comments: Comment[];

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.images, {
    onDelete: 'CASCADE',
  })
    portfolio: Portfolio;
}
