import React, { useState } from 'react';
import axios from 'axios';

const BorrowBook = () => {
    const [userId, setUserId] = useState('');
    const [bookId, setBookId] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/borrow', {
            user_id: userId,
            book_id: bookId,
            due_date: dueDate
        }).then(response => {
            alert(response.data.message);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>User ID:</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div>
                <label>Book ID:</label>
                <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} />
            </div>
            <div>
                <label>Due Date:</label>
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <button type="submit">Borrow Book</button>
        </form>
    );
};

export default BorrowBook;
