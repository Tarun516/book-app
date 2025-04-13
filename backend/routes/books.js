// backend/routes/books.js
import express from "express";
import Book from "../models/Book.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage configuration for cover uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-cover${ext}`);
  },
});
const upload = multer({ storage });

/**
 * @route   POST /api/books
 * @desc    Create a new book listing
 * @access  Public (mock auth via owner in body)
 */
router.post("/", upload.single("cover"), async (req, res) => {
  const { title, author, genre, location, contact, owner } = req.body;
  if (!owner) {
    return res.status(400).json({ error: "Owner ID is required" });
  }

  try {
    const book = new Book({
      title,
      author,
      genre,
      location,
      contact,
      coverUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      owner,
    });
    await book.save();
    res.status(201).json({ message: "Book listed successfully", book });
  } catch (err) {
    console.error("Error creating book:", err);
    res
      .status(500)
      .json({ error: "Error creating book", details: err.message });
  }
});

/**
 * @route   GET /api/books
 * @desc    Get all book listings, with optional genre/location filters
 * @access  Public
 */
router.get("/", async (req, res) => {
  const { genre, location } = req.query;
  const filter = {};
  if (genre) filter.genre = genre;
  if (location) filter.location = location;

  try {
    const books = await Book.find(filter).populate("owner", "name email");
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res
      .status(500)
      .json({ error: "Error fetching books", details: err.message });
  }
});

/**
 * @route   PUT /api/books/:id
 * @desc    Update a book listing (fields + cover + status)
 * @access  Public (mock auth via owner in body or query)
 */
router.put("/:id", upload.single("cover"), async (req, res) => {
  const owner = req.body.owner || req.query.owner;
  const status = req.body.status;
  if (!owner) {
    return res.status(400).json({ error: "Owner ID is required" });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (book.owner.toString() !== owner) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update allowed text fields
    ["title", "author", "genre", "location", "contact"].forEach((field) => {
      if (req.body[field]) book[field] = req.body[field];
    });

    // Update cover if provided
    if (req.file) {
      book.coverUrl = `/uploads/${req.file.filename}`;
    }

    // Toggle status if provided and valid
    if (status && ["Available", "Rented/Exchanged"].includes(status)) {
      book.status = status;
    }

    await book.save();
    res.json({ message: "Book updated", book });
  } catch (err) {
    console.error("Error updating book:", err);
    res
      .status(500)
      .json({ error: "Error updating book", details: err.message });
  }
});

/**
 * @route   DELETE /api/books/:id
 * @desc    Delete a book listing
 * @access  Public (mock auth via owner in query)
 */
router.delete("/:id", async (req, res) => {
  const owner = req.query.owner;
  if (!owner) {
    return res.status(400).json({ error: "Owner ID is required" });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    if (book.owner.toString() !== owner) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await book.deleteOne();
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res
      .status(500)
      .json({ error: "Error deleting book", details: err.message });
  }
});

export default router;
