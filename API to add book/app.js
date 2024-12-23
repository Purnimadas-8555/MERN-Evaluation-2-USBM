const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Path to the books.json file
const booksFilePath = path.join(__dirname, 'books.json');

// Helper function to read the books file
const readBooksFile = () => {
  try {
    const data = fs.readFileSync(booksFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading the books file:', err);
    return [];
  }
};

// Helper function to write to the books file
const writeBooksFile = (books) => {
  try {
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to the books file:', err);
  }
};

// In-memory books array
let books = readBooksFile();

// API to add a new book
app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Title, author, and year are required' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year,
  };

  books.push(newBook);
  writeBooksFile(books);

  res.status(201).json({ message: 'Book added successfully', book: newBook });
});

// API to get all books (optional)
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Start the server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});