import { books, PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();


async function main(){
    const books: books[] = await prisma.books.findMany();

    

    for (let i = 0; i < 15; i++) {
        await prisma.rentals.create({
            data: {
                start_date: faker.date.past(),
                end_date: faker.date.soon(),
                book_id: faker.helpers.arrayElement(books).id

            }
        })
        
    }
}




main()
    .catch(e =>{
        console.error(e);
        process.exit(1);
})
    .finally(async () =>{
        await prisma.$disconnect()
} )