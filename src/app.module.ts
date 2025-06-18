import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './config/logger/logger.module';

@Module({
  imports: [
    TasksModule, 
    UsersModule, 
    DatabaseModule, 
    EmployeeModule, 
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 10000,
        limit: 3,
      }, 
      {
        name: 'long',
        ttl: 60000,
        limit: 3,
      }, 
    ]), LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,     
  }],
})
export class AppModule {}
