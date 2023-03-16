import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { User } from '../user/user.entity';
  import { Image } from '../image/image.entity';
  
  @Entity('portfolios')
  export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ type: 'text' })
    description: string;
  
    @ManyToOne(() => User, (user) => user.portfolios, {
      onDelete: 'CASCADE',
    })
    user: User;
  
    @OneToMany(() => Image, (image) => image.portfolio, {
      cascade: true,
    })
    images: Image[];
  }