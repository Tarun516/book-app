// backend/routes/books.js
import express from "express";
import Book from "../models/Book.js";
import auth from "./auth.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// @route   POST /api/books
// @desc    Create a new book listing
// @access  Private
router.post("/", auth, upload.single("cover"), async (req, res) => {
  const { title, author, genre, location } = req.body;
  try {
    const book = new Book({
      title,
      author,
      genre,
      location,
      coverUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      owner: req.user.id,
    });
    await book.save();
    res.status(201).json({ message: "Book listed successfully", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error creating book", details: error.message });
  }
});

// @route   GET /api/books
// @desc    Get all book listings with optional filters
// @access  Public
router.get("/", async (req, res) => {
  const { genre, location } = req.query;
  const filter = {};
  if (genre) filter.genre = genre;
  if (location) filter.location = location;
  try {
    const books = await Book.find(filter).populate("owner", "name email");
    res.json(books);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error fetching books", details: error.message });
  }
});

// @route   PUT /api/books/:id
// @desc    Update a book listing
// @access  Private
router.put("/:id", auth, upload.single("cover"), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    const { title, author, genre, location } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (location) book.location = location;
    if (req.file) book.coverUrl = `/uploads/${req.file.filename}`;

    await book.save();
    res.json({ message: "Book updated", book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error updating book", details: error.message });
  }
});

// @route   DELETE /api/books/:id
// @desc    Delete a book listing
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (book.owner.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    await book.remove();
    res.json({ message: "Book deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error deleting book", details: error.message });
  }
});

export default router;
