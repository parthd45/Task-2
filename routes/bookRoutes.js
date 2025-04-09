const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Fetch all books
router.get('/', (req, res) => {
  console.log('✅ /api/books route hit!'); // Debug
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to load books' });
    res.json(results);
  });
});

// Add a new book (Admin Only)
router.post('/', (req, res) => {
  const { title, author, price, description, image_url } = req.body;

  const sql = 'INSERT INTO books (title, author, price, description, image_url) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, author, price, description, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add book' });
    res.status(201).json({ message: 'Book added successfully' });
  });
});

module.exports = router; // Keep this ONCE at the end
