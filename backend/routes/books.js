import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// @route   POST /api/books
// @desc    Create a new book listing (Only by Owner)
// @access  Private (in production, should be authenticated)
router.post("/", async (req, res) => {
  const { title, author, genre, city, contact, owner } = req.body;

  try {
    const book = new Book({
      title,
      author,
      genre,
      city,
      contact,
      owner, // should be a valid ObjectId of a User
    });

    await book.save();

    res.status(201).json({
      message: "Book listed successfully",
      book,
    });
  } catch (error) {
    console.error("Error creating book listing:", error); // log the exact error
    res.status(500).json({
      error: "Error creating book listing",
      details: error.message, // show helpful error message
    });
  }
});

// @route   GET /api/books
// @desc    Get all book listings (anyone can access)
// @access  Public
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate(
      "owner",
      "name email mobileNumber"
    );
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      error: "Error fetching book listings",
      details: error.message,
    });
  }
});

// @route   PUT /api/books/:id/status
// @desc    Update book status (e.g., Rented, Exchanged)
// @access  Private
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      message: "Book status updated",
      book,
    });
  } catch (error) {
    console.error("Error updating book status:", error);
    res.status(500).json({
      error: "Error updating status",
      details: error.message,
    });
  }
});

export default router;
