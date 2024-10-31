import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: '123',
      database: 'banknest',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
