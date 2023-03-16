import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { User } from '../user/user.entity';
import { CreatePortfolioDto } from './dtos/portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(userId: number): Promise<Portfolio[]> {
    return this.portfolioRepository.find({ where: { user: { id: userId } }, relations: ['images'] });
  }

  async findOne(userId: number, portfolioId: number): Promise<Portfolio> {
    return this.portfolioRepository.findOne({ where: { id: portfolioId, user: { id: userId } }, relations: ['images'] });
  }

  async create(userId: number, createPortfolioDto: CreatePortfolioDto): Promise<Portfolio> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const portfolio = this.portfolioRepository.create(createPortfolioDto);
    portfolio.user = user;
    return this.portfolioRepository.save(portfolio);
  }

  async delete(userId: number, portfolioId: number): Promise<void> {
    await this.portfolioRepository.delete({ id: portfolioId, user: { id: userId } });
  }
}