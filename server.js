const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'JOYCE',
    password: 'password',
    database: 'library_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Get all books
app.get('/books', (req, res) => {
    db.query('SELECT * FROM Books', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Add a new book
app.post('/books', (req, res) => {
    const { title, author, publication_year, isbn } = req.body;
    db.query('INSERT INTO Books (title, author, publication_year, isbn) VALUES (?, ?, ?, ?)',
        [title, author, publication_year, isbn], (err, results) => {
            if (err) throw err;
            res.json({ message: 'Book added!', bookId: results.insertId });
        });
});

// Borrow a book
app.post('/borrow', (req, res) => {
    const { user_id, book_id, due_date } = req.body;
    db.query('INSERT INTO BorrowedBooks (user_id, book_id, borrow_date, due_date) VALUES (?, ?, CURDATE(), ?)',
        [user_id, book_id, due_date], (err, results) => {
            if (err) throw err;
            db.query('UPDATE Books SET available = FALSE WHERE book_id = ?', [book_id]);
            res.json({ message: 'Book borrowed!', borrowId: results.insertId });
        });
});

// Return a book
app.post('/return', (req, res) => {
    const { borrow_id } = req.body;
    db.query('UPDATE BorrowedBooks SET return_date = CURDATE() WHERE borrow_id = ?',
        [borrow_id], (err, results) => {
            if (err) throw err;
            db.query('UPDATE Books SET available = TRUE WHERE book_id = (SELECT book_id FROM BorrowedBooks WHERE borrow_id = ?)', [borrow_id]);
            res.json({ message: 'Book returned!' });
        });
});
