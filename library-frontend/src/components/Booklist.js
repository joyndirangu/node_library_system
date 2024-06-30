import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Library Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.book_id}>{book.title} by {book.author}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
