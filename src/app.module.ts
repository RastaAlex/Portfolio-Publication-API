import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { ImageModule } from './image/image.module';
import { CommentModule } from './comment/comment.module';
import config from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.typeorm.connection,
      host: config.typeorm.host,
      port: config.typeorm.port,
      username: config.typeorm.username,
      password: config.typeorm.password,
      database: config.typeorm.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: config.typeorm.synchronize,
    }),
    AuthModule,
    UserModule,
    PortfolioModule,
    ImageModule,
    CommentModule,
  ],
})
export class AppModule {}