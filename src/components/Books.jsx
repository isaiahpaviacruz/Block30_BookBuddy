/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from 'react';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const baseURL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com';

    fetch(`${baseURL}/api/books`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      
      if (data.books && Array.isArray(data.books)) {
        setBooks(data.books);
      } else {
        
        console.error('Data is not properly formatted:', data);
        setBooks([]); 
      }
    })
    .catch(error => {
      
      console.error('Error fetching books:', error.message);
      setBooks([]); 
    });
  }, []);
  const handleBookClick = (book) => {
    const bookDetails = `
      Title: ${book.title}
      Author: ${book.author}
      Description: ${book.description}
      Available: ${book.available ? 'Yes' : 'No'}
    `;
    alert(bookDetails);
  };
  
  return (
    <div className="books-container">
      <h2>Books Available in the Library</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-item">
            <img src={book.coverimage} alt={book.title} className="book-cover" />
            <div className="book-info">
              <p className="book-title" onClick={() => handleBookClick(book)}>
                {book.title}
              </p>
              <button className="book-button">Add Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Books;