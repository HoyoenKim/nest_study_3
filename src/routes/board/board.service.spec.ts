import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;
  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
         provide: boardRepositoryToken,
         useValue: {
          create: jest.fn(),
          save: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
          findOne: jest.fn(),
          findOneBy: jest.fn(),
         },
        }
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('should be defined (Service)', () => {
    expect(boardService).toBeDefined();
  });

  it('should be defined (Repository)', () => {
    expect(boardRepository).toBeDefined();
  });

  describe('board searching', () => {
    it('author of board with id 1 is hoyeonKim', async() => {
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 1,
        userId: 2,
        contents: 'test test',
        user: {
          id: 1,
          username: 'HoyeonKim',
          name: 'HoyeonKim',
        }
      } as Board)
      const board = await boardService.getBoardById(1);

      expect(board.user.name).toBe('HoyeonKim');
    })
  })
});
