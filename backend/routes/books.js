const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');

// Get all books
router.get('/', async (req, res) => {
  try {
    const { title, location, genre } = req.query;
    
    // Build query filters
    const filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (genre) filter.genre = { $regex: genre, $options: 'i' };
    
    const books = await Book.find(filter).populate('owner', 'name email mobileNumber');
    res.json(books);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create book listing (only owners)
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, location, ownerId, coverImage } = req.body;
    
    // Verify owner exists and is indeed an owner
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    
    if (owner.role !== 'owner') {
      return res.status(403).json({ message: 'Only book owners can create listings' });
    }
    
    // Create book
    const book = new Book({
      title,
      author,
      genre,
      location,
      owner: ownerId,
      coverImage: coverImage || undefined
    });
    
    await book.save();
    res.status(201).json(book);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner', 'name email mobileNumber');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update book status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    book.status = status;
    await book.save();
    
    res.json(book);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    await Book.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Book deleted successfully' });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;