/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SingleBook = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const baseURL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com';

    fetch(`${baseURL}/api/books/${bookId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => setBook(data))
    .catch(error => {
      console.error('Error fetching book details:', error);
      setError('Could not fetch book details. Please try again later.');
    });
  }, [bookId]);

  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Loading book details...</div>;

  return (
    <div>
      <img src={book.coverimage} alt={`Cover of the book: ${book.title}`} />
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <p>Availability: {book.available ? 'Available' : 'Checked out'}</p>
    </div>
  );
};

SingleBook.propTypes = {
  bookId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SingleBook;