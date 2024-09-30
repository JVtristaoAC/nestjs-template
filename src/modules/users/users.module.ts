import { Module } from '@nestjs/common';
import { UsersService } from './app/services/users.service';
import { UsersController } from './presentation/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
