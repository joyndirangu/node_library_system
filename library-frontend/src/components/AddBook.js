import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [isbn, setIsbn] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/books', {
            title,
            author,
            publication_year: publicationYear,
            isbn
        }).then(response => {
            alert(response.data.message);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Author:</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>
            <div>
                <label>Publication Year:</label>
                <input type="text" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} />
            </div>
            <div>
                <label>ISBN:</label>
                <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default AddBook;
