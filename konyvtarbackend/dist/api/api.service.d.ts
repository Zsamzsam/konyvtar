import { CreateApiDto } from './dto/create-api.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ApiService {
    private readonly db;
    constructor(db: PrismaService);
    create(createBookDto: CreateApiDto): import(".prisma/client").Prisma.Prisma__booksClient<{
        id: number;
        title: string;
        author: string;
        publish_year: number;
        page_count: number;
        created_at: Date | null;
        updated_at: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        author: string;
        publish_year: number;
        page_count: number;
    }[]>;
    rent(id: number): Promise<{
        id: number;
        book_id: number;
        start_date: Date;
        end_date: Date;
    }>;
}
