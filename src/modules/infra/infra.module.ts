import { Global, Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { BaseRepository } from './repositories/base.repository';

@Global()
@Module({
  providers: [BaseRepository, PrismaService],
  exports: [BaseRepository],
})
export class InfraModule {}
