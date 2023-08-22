import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {}

    async findAll() {
        return this.boardRepository.find();
    }

    async findById(id: number) {
       const board = await this.boardRepository.findOne({
        where: {
            id,
        },
        relations: {
            user: true,
        }
       });
       if(!board) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
       }
       return board;
    }

    async createBoard(data: CreateBoardDto) {
        return this.boardRepository.save(data);
    }

    async updateBoard(userId: number, id: number, data: UpdateBoardDto) {
        const board = await this.getBoardById(id);
        if(!board) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        } 

        if(userId !== board.userId) {
            throw new UnauthorizedException();
        }

        return this.boardRepository.update(id, {
            ...data
        });
    }

    async deleteBoard(userId: number, id: number) {
        const board = await this.getBoardById(id);
        if(!board) {
            throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
        }
        
        if(userId !== board.userId) {
            throw new UnauthorizedException();
        }

        return this.boardRepository.remove(board);
    }

    async getBoardById(id: number) {
        const board = await this.boardRepository.findOneBy({
            id
        });
        return board;
    }
}
