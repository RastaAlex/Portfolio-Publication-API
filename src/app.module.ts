import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { PortfolioModule } from '@portfolio/portfolio.module';
import { ImageModule } from '@image/image.module';
import { HttpErrorFilter } from './exceptions/http-exception.filter';
import { ormConfig } from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    UserModule,
    PortfolioModule,
    ImageModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
