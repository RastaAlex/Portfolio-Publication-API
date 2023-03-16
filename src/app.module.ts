import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST, 
      port: 5432,
      username: 'your_db_user',
      password: 'your_db_password',
      database: 'your_db_name',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PortfolioModule,
    ImageModule,
    CommentModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
