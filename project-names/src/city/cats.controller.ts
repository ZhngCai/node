import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Redirect,
  Query,
  Body,
} from '@nestjs/common';
import { Cat } from './interfaces/cat';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() cat: Cat) {
    this.catsService.create(cat);
  }

  @Get('cityEnd')
  async end(@Query() body: { name: string; code: string }): Promise<string> {
    return this.catsService.end(body.name, body.code);
  }

  @Get('cityStart')
  async start(@Query('name') name: string): Promise<string> {
    return this.catsService.start(name);
  }
}
