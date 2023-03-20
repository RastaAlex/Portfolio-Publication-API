import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import request from 'supertest';
import { PortfolioService } from '@portfolio/portfolio.service';
import { PortfolioController } from '@portfolio/portfolio.controller';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { Portfolio } from '@portfolio/portfolio.entity';
import { User } from '@user/user.entity';
import { CreatePortfolioDto } from '@portfolio/dtos/portfolio.dto';
import { CreateUserDto } from '@user/dtos/user.dto';

function createPortfolioStub(props: Partial<Portfolio>): Portfolio {
  const portfolio = new Portfolio();
  Object.assign(portfolio, props);

  return portfolio;
}

describe('PortfolioController', () => {
  let app: INestApplication;
  let portfolioService: PortfolioService;
  const users: Partial<User>[] = [];
  const mockPortfolios: Partial<Portfolio>[] = [];

  const mockPortfolioRepository: Partial<Repository<Portfolio>> = {
    find: jest.fn().mockImplementation((options) => {
        const userId = options.where.user?.id;
        if (!userId) {
          throw new Error('User ID not provided');
        }
        const portfolios = mockPortfolios.filter((portfolio) => portfolio.user?.id === userId);
        return Promise.resolve(portfolios);
      }),
      findOne: jest.fn().mockImplementation((options) => {
        const userId = options.where.user?.id;
        const portfolioId = options.where.id;
        const foundPortfolio = mockPortfolios.find((portfolio) => portfolio.user?.id === userId && portfolio.id === portfolioId);
        return foundPortfolio ? Promise.resolve(foundPortfolio as Portfolio) : Promise.resolve(null);
      }),
    create: jest.fn().mockImplementation((createPortfolioDto: CreatePortfolioDto) => {
      const newPortfolio: Partial<Portfolio> = {
        id: Date.now(),
        ...createPortfolioDto,
        images: [],
      };
      return newPortfolio as Portfolio;
    }),
    save: jest.fn().mockImplementation((portfolio: Portfolio) => {
      mockPortfolios.push(portfolio);
      return Promise.resolve(portfolio);
    }),
    delete: jest.fn().mockImplementation((options) => {
        const userId = options.user?.id;
        const portfolioId = options.id;
        const initialLength = mockPortfolios.length;
        const updatedPortfolios = mockPortfolios.filter((portfolio) => {
          return (portfolio.user?.id !== userId || portfolio.id !== portfolioId);
        });
        mockPortfolios.length = 0;
        mockPortfolios.push(...updatedPortfolios);
      
        return Promise.resolve({ affected: initialLength - mockPortfolios.length });
      }),
  };

  const mockUserRepository: Partial<Repository<User>> = {
    find: jest.fn().mockImplementation(() => Promise.resolve(users)),
    findOne: jest.fn((options: FindOneOptions<User>) => {
        const email = options.where ? (options.where as any).email : undefined;
        const foundUser = users.find((user) => user.email === email);
        return foundUser ? Promise.resolve(foundUser as User) : Promise.resolve(null);
      }),
    create: jest.fn().mockImplementation((createUserDto: CreateUserDto) => {
      const newUser: Partial<User> = {
        id: Date.now(),
        ...createUserDto,
        portfolios: [],
        hashPassword: async function (this: User) {
          this.password = 'hashed' + this.password;
        },
        comparePassword: async function (this: User, password: string) {
          return this.password === 'hashed' + password;
        },
      };
      return newUser as User;
    }),
    save: jest.fn().mockImplementation((user: User) => {
      users.push(user);
      return Promise.resolve(user);
    }),
    delete: jest.fn().mockImplementation((id: number) => {
      const initialLength = users.length;
      const updatedUsers = users.filter((user) => user.id !== id);
      users.length = 0;
      users.push(...updatedUsers);
  
      return Promise.resolve({ affected: initialLength - users.length });
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: getRepositoryToken(Portfolio),
          useValue: mockPortfolioRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
      controllers: [PortfolioController],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();
    await app.init();
    portfolioService = app.get<PortfolioService>(PortfolioService);
  });

  describe('GET /users/:userId/portfolios', () => {
    //TODO: Add test for getting all portfolios
  });

  describe('GET /users/:userId/portfolios/:id', () => {
    //TODO: Add test for getting a portfolio by ID
  });

  describe('POST /users/:userId/portfolios', () => {
    //TODO: Add test for creating a portfolio
  });

  describe('DELETE /users/:userId/portfolios/:portfolioId', () => {
    //TODO: Add test for deleting a portfolio
  });

  afterAll(async () => {
    await app.close();
  });
});