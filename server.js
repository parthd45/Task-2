const express = require('express');
const db = require('./config/db'); 
const cartRoutes = require('./routes/cartRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors'); // Add CORS
const app = express();

app.use(cors()); // Allow frontend requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cart', cartRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Welcome to the Bookstore API'));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
