import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "books")
public class Book {

  @Id
  private int id;
  private String title;
  private String author;
  private int publish_year;
  private int page_count;

  public Book(){}

  public Book(int id, int page_count, int publish_year, String author, String title) {
    this.id = id;
    this.page_count = page_count;
    this.publish_year = publish_year;
    this.author = author;
    this.title = title;
  }

  public int getPublish_year() {
    return publish_year;
  }

  public int getPage_count() {
    return page_count;
  }

  public String getAuthor() {
    return author;
  }

  public String getTitle() {
    return title;
  }

  public int getId() {
    return id;
  }

  @Override
  public String toString(){
    return "Szerző:" + author
        + "\n Cím" + title
        + "\n Kiadási év:" + publish_year
        + "\n Oldalszám" + page_count;
  }


}


