import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';
import { UserRepositoryMongoose } from './repositories/users.repository.mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [UsersController],
  providers: [UsersService, {
    provide: UserRepository,
    useClass: UserRepositoryMongoose,
  }],
})
export class UsersModule {}
