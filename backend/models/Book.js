// backend/models/Book.js
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  city: { type: String, required: true },
  contact: { type: String, required: true }, // Can store email/phone
  coverUrl: { type: String },          // New field for book cover image URL
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Rented/Exchanged"],
    default: "Available",
  },
});

export default mongoose.model("Book", BookSchema);
