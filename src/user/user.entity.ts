import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  import { Portfolio } from '../portfolio/portfolio.entity';
  import * as bcrypt from 'bcrypt';
  
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Portfolio, (portfolio) => portfolio.user, {
      cascade: true,
    })
    portfolios: Portfolio[];
  
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 12);
    }
  
    async comparePassword(attempt: string): Promise<boolean> {
      return await bcrypt.compare(attempt, this.password);
    }
  }