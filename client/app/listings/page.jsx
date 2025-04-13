"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ListingsPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="p-4">Loading books...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book Listings</h1>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="border rounded-lg shadow p-4 bg-white hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-gray-700">Genre: {book.genre}</p>
              <p className="text-gray-700">City: {book.city}</p>
              <p className="text-gray-700">Contact: {book.contact}</p>
              <p className="text-gray-700">
                Owner: {book.owner?.name} ({book.owner?.email})
              </p>
              <p className="text-sm text-green-600 mt-2">
                Status: {book.status || "Available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
