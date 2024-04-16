import { env } from 'node:process';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/users/repositories/users.repository';
import { UserRepositoryMongoose } from 'src/users/repositories/users.repository.mongoose';
import { UsersModule } from 'src/users/users.module';

const url = env.DATABASE_URL ?? 'mongodb://localhost:27017/nest';

@Module({
  imports: [MongooseModule.forRoot(url)],
  providers: [
    {
      provide: UserRepository,
      useClass: UserRepositoryMongoose,
    },
  ],
})
export class MongooseDatabaseModule {}
