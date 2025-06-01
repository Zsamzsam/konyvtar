import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class BookRepository {
  private EntityManagerFactory emf;
  private EntityManager em;

  public BookRepository(){
    try {
      this.emf = Persistence.createEntityManagerFactory("books");
      this.em = emf.createEntityManager();
    } catch (Exception e){
      System.out.println("Error connecting to database");
      System.out.println("Details" + e.getMessage());
    }
  }

  public List<Book> findAll(){
    TypedQuery<Book> query = em.createQuery("SELECT b FROM Book b", Book.class);
    return query.getResultList();
  }

  public void close(){
    em.close();
    emf.close();
  }
}
