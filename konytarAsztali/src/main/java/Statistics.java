import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Statistics {
  List<Book> books;
  BookRepository bookRepository;

  public Statistics(){
    this.bookRepository = new BookRepository();
    this.books = bookRepository.findAll();
    printLongBooks();
    anyOldBooks();
    longestBooks();
    hasMostBooks();
    findAuthorByTitle();
  }

  private void longestBooks() {
    Optional<Book> longestBook = books.stream()
        .max(Comparator.comparing(Book::getPage_count));
    if (longestBook.isPresent()){
      System.out.println("A leghosszabb könyv: \n" + longestBook.get());
    }
  }

  private void  printLongBooks(){
    long numberOfBooks = books.stream()
        .filter(book -> book.getPage_count() > 500)
        .count();
    System.out.println("500 oldalnál hosszabb könyvek száma: " + numberOfBooks);
  }

  private void  anyOldBooks(){
    boolean anyOldBooks = books.stream()
        .anyMatch(book -> book.getPublish_year() < 1950);

    System.out.println(anyOldBooks ? "Van 1950-nél régebbi könyv" : "Nincs 1950-nél régebbi könyv");
  }

  private void hasMostBooks(){
    books.stream()
        .collect(Collectors.groupingBy(Book ::getAuthor, Collectors.counting()))
        .entrySet().stream()
        .max(Map.Entry.comparingByValue())
        .ifPresent(entry -> System.out.println("A legtöbb könyvvelr endelkező szerző: " +entry.getKey()));
  }

  private void findAuthorByTitle(){
    Scanner scanner = new Scanner(System.in);
    System.out.println("Enter title: ");
    String title = scanner.nextLine();
    books.stream()
        .filter(book -> book.getTitle().equals(title))
        .findFirst().ifPresentOrElse(book -> System.out.println(" A megadott könyv szerzője" + book.getAuthor()),
            () -> System.out.println("Nincs ilyen könyv"));

  }
}
