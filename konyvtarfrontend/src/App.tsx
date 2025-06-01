import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

interface BookDto {
  title: string;
  author: string;
  publish_year: number;
  page_count: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  publish_year: number;
  page_count: number;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<BookDto>({
    title: '',
    author: '',
    publish_year: 0,
    page_count: 0,
  });
  const [error, setError] = useState<string>();
  const [rentResponse, setRentResponse] = useState<string | null>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: name === "publish_year" || name === "page_count" ? Number(value) : value
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message);
    }
    else {
      setError("");
      fetchData();
    }

  };

  const handleRent = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/books/${id}/rent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      setRentResponse("Already rented book!");
    }
    else {
      setRentResponse("Successfully rented the book!");
    }
  }

  const fetchData = async () => {
    fetch("http://localhost:3000/api/books")
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div>
          <a id='zsanett' href='#newBook'>Új könyv felvétele</a>
          <a href="https://petrik.hu/">Petrik honlap</a>
        </div>
        <h1>Petrik Könyvtár Nyilvántartó</h1>
        {rentResponse &&
          <p className="alert alert-info">{rentResponse}</p>}
        <div className="row">
          {books.map((book) => (
            <div className="card col-lg-4 col-md-6 col-sm-12">
              <div className='card-body'>
                <h5 className='card-title'>{book.title}</h5>
                <h5 className='card-title'>{book.author}</h5>
                <p className='card-text'>Kiadási év: {book.publish_year}<br />Hossz: {book.page_count}</p>
              </div>
              <img src={`${book.author}.jpg`} className="card-img-top card-img-bottom" alt={book.author} />
              <button onClick={() => handleRent(book.id)}>Rent</button>
            </div>
          ))}
        </div>
        <form id='newBook' onSubmit={handleSubmit}>
          {error &&
            <p className="alert alert-danger">{error}</p>}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title: </label>
            <input type="text" className="form-control" id="title" name="title" value={newBook?.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">Author: </label>
            <input type="text" className="form-control" id="author" name="author" value={newBook?.author} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="publish_year" className="form-label">Publish year: </label>
            <input type="number" className="form-control" id="publish_year" name="publish_year" value={newBook?.publish_year} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="page_count" className="form-label">Page count: </label>
            <input type="number" className="form-control" id="page_count" name="page_count" value={newBook?.page_count} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
