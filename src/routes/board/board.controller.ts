import { Body, Controller, Get, Param, Post, Put, Delete, Injectable, ParseIntPipe, ValidationPipe, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';

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
  @UseGuards(JwtAuthGuard)
	createBoard(
    @UserInfo() userInfo,
    @Body('contents') contents: string) {
      if(!userInfo) {
        throw new UnauthorizedException();
      }
		
      return this.boardService.createBoard({
        userId: userInfo.id,
        contents,
      });
	}

	@Put(':id')
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() userInfo,
    @Body(new ValidationPipe()) data: UpdateBoardDto) {
		return this.boardService.updateBoard(userInfo.id, id, data);
  }

	@Delete(':id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @UserInfo() userInfo,) {
    return this.boardService.deleteBoard(userInfo.id, id);
  }
}
