import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Board e2e Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('AppController', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  
    it('/name2?name=Hoyeon (GET)', () => {
      return request(app.getHttpServer())
        .get('/name2?name=Hoyeon')
        .expect(200)
        .expect(`Hello, Hoyeon!`);
    });

    it('login', () => {
      return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'hoyeonkim1',
        password: '12345678'
      })
      .expect(201);
    })
  });
  
  describe('BoardController', () => {
    it('get board (GET)', () => {
      return request(app.getHttpServer())
        .get('/board')
        .expect(200);
    });
  });

  describe('UserController', () => {});
});
