import { Body, Controller, Get, Param, Post, Put, Delete, Injectable, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService
  ) {}

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.boardService.findById(id);
  }

  @Post()
	createBoard(@Body(new ValidationPipe()) data: CreateBoardDto) {
		return this.boardService.createBoard(data);
	}

	@Put(':id')
  updateBoard(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) data: UpdateBoardDto) {
		return this.boardService.updateBoard(id, data);
  }

	@Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.deleteBoard(id);
  }
}
