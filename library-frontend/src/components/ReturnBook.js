import React, { useState } from 'react';
import axios from 'axios';

const ReturnBook = () => {
    const [borrowId, setBorrowId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/return', {
            borrow_id: borrowId
        }).then(response => {
            alert(response.data.message);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Borrow ID:</label>
                <input type="text" value={borrowId} onChange={(e) => setBorrowId(e.target.value)} />
            </div>
            <button type="submit">Return Book</button>
        </form>
    );
};

export default ReturnBook;
