import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';

@Controller('api/books')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  createBook(@Body() createBookDto: CreateApiDto){
    return this.apiService.create(createBookDto)
  }

  @Post(':id/rent')
  create(@Param('id') id: string){
    return this.apiService.rent(+id);
  }

  @Get()
  findAll() {
    return this.apiService.findAll();
  }


}
