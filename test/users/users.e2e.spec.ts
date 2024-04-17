import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersRepository } from '../../src/users/repositories/users.repository';
import { AppModule } from '../../src/app.module';
import { UsersFactory } from '../../src/users/factories/users.factory';

describe('users controller (e2e)', () => {
  let app: INestApplication;
  let usersFactory: UsersFactory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UsersFactory],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    usersFactory = app.get(UsersFactory);
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(usersFactory.make())
      .expect(201);
  });
});
