const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Add book to cart
router.post('/add', (req, res) => {
  const { user_id, book_id } = req.body;

  const sql = 'INSERT INTO cart (user_id, book_id) VALUES (?, ?)';
  db.query(sql, [user_id, book_id], (err) => {
    if (err) return res.status(500).json({ error: 'Failed to add to cart' });
    res.status(201).json({ message: 'Book added to cart' });
  });
});

// Get user cart
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT books.title, books.author, books.price, cart.quantity 
    FROM cart 
    JOIN books ON cart.book_id = books.id 
    WHERE cart.user_id = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to load cart' });
    res.json(results);
  });
});

module.exports = router;
