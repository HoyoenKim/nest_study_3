import { Controller, Get, HttpException, HttpStatus, Logger, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ip } from './decorators/ip.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  //private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(
    @Ip() ip: string,
  ): string {
    //throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    
    //this.logger.log(ip);
    //this.logger.debug(ip);
    //this.logger.error(ip);
    //this.logger.verbose(ip);
    //this.logger.warn(ip);
    
    console.log(this.configService.get<string>('ENVIRONMENT'));

    return this.appService.getHello();
  }

  @Get('/name/:name')
  getName(@Param('name') name: string): string {
    return `Hello, ${name}!`;
  }

  @Get('/name2')
  getName2(@Query('name') name: string): string {
    return `Hello, ${name}!`;
  }
}
