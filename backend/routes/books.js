// backend/routes/books.js
import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Create a book listing (only by Owner)
router.post('/', async (req, res) => {
  const { title, author, genre, city, contact, owner } = req.body;
  try {
    const book = new Book({ title, author, genre, city, contact, owner });
    await book.save();
    res.status(201).json({ message: 'Book listed successfully', book });
  } catch (error) {
    res.status(500).json({ error: 'Error creating book listing' });
  }
});

// Get all book listings (both Owner & Seeker can browse)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('owner', 'name email mobileNumber');
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book listings' });
  }
});

// Update book status (mark as Rented/Exchanged)
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (book) {
      res.json({ message: 'Book status updated', book });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating status' });
  }
});

export default router;
