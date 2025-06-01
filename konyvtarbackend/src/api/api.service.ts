import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { PrismaService } from 'src/prisma.service';
import {books, rentals} from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private readonly db: PrismaService){

  }

  create(createBookDto: CreateApiDto) {
    return this.db.books.create({
      data: {
        ...createBookDto
      }
    });
  }

  findAll() {
    return this.db.books.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        publish_year: true,
        page_count: true,
        created_at: false,
        updated_at: false
      }
    });
  }

  async rent (id: number){
    const book: books = await this.db.books.findUnique({
      where: {
        id: id
      }
    });

    if(book == null) {
      throw new NotFoundException();
    }

    const rent: rentals[] = await this.db.rentals.findMany({
      where: {
        book_id: id
      }
    });

    const now = new Date(Date.now());
    rent.forEach(function(rent){
      if(now >= rent.start_date && now <= rent.end_date){
        throw new ConflictException();
      }
    })

    return this.db.rentals.create({
      data: {
        books: {
          connect: {
            id:id
          }
        },
        start_date: new Date(Date.now()),
        end_date: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7))
      }
    })
  }
}
