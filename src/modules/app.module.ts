import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, InfraModule],
})
export class AppModule {}
