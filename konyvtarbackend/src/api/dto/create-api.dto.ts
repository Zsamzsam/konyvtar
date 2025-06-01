import { IsInt, IsString, Min } from "class-validator";


export class CreateApiDto {
    @IsString()
    title: string;
    @IsString()
    author: string;
    @IsInt()
    publish_year: number;
    @IsInt()
    @Min(0)
    page_count: number;
}
