import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import request from 'supertest';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { User } from '@user/user.entity';
import { CreateUserDto } from '@user/dtos/user.dto';

function createUserStub(props: Partial<User>): User {
    const user = new User();
    Object.assign(user, props);
  
    return user;
  }

describe('UserController', () => {
  let app: INestApplication;
  let userService: UserService;
  const users: Partial<User>[] = [];

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
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
      controllers: [UserController],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();
    await app.init();
    userService = app.get<UserService>(UserService);
  });

  describe('POST /users', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const createdUser = createUserStub({
        id: 1,
        ...createUserDto,
        portfolios: [],
      });

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDto)
        .expect(201);

        expect(response.body).toMatchObject(createdUser);
    });
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
        const usersArray = [
            createUserStub({
              id: 1,
              email: 'test1@example.com',
              password: 'password123',
              portfolios: [],
            }),
            createUserStub({
              id: 2,
              email: 'test2@example.com',
              password: 'password123',
              portfolios: [],
            }),
          ];
  
      jest.spyOn(userService, 'findAll').mockResolvedValue(usersArray);
  
      const response = await request(app.getHttpServer()).get('/users').expect(200);

      expect(response.body).toMatchObject(usersArray);
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user by ID', async () => {
        const user = createUserStub({
            id: 1,
            email: 'test1@example.com',
            password: 'password123',
            portfolios: [],
          });
  
      jest.spyOn(userService, 'findOneById').mockResolvedValue(user);
  
      const response = await request(app.getHttpServer()).get('/users/1').expect(200);

      expect(response.body).toMatchObject(user);
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user by ID', async () => {
      const userIdToDelete = 1;
  
      jest.spyOn(userService, 'delete').mockResolvedValue();

      await request(app.getHttpServer()).delete(`/users/${userIdToDelete}`).expect(200);
  
      expect(userService.delete).toHaveBeenCalledWith(userIdToDelete.toString());
    });
  });

  afterAll(async () => {
    await app.close();
  });
});