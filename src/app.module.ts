import { Module } from '@nestjs/common';
import { MongooseDatabaseModule } from './commom/database/mongoose.database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseDatabaseModule, UsersModule],
})
export class AppModule {}
