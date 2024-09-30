import { env } from 'node:process';
import { environment } from '@shared/interfaces';

export function environmentConfig(): environment {
  return {
    port: +env.PORT || 3000,
    databaseUrl: env.DATABASE_URL,
  };
}
