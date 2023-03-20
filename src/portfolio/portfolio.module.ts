import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { User } from '@user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio, User])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
