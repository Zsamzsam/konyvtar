import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    createBook(createBookDto: CreateApiDto): import(".prisma/client").Prisma.Prisma__booksClient<{
        id: number;
        title: string;
        author: string;
        publish_year: number;
        page_count: number;
        created_at: Date | null;
        updated_at: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    create(id: string): Promise<{
        id: number;
        book_id: number;
        start_date: Date;
        end_date: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        author: string;
        publish_year: number;
        page_count: number;
    }[]>;
}
