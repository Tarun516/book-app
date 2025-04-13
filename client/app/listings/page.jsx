// client/app/listings/page.jsx
"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import SearchFilter from "@/components/SearchFilter";
import BookCard from "@/components/BookCard";
import { AuthContext } from "@/context/AuthContext";

export default function ListingsPage() {
  const { user } = useContext(AuthContext);
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({ genre: "", location: "" });
  const [genres, setGenres] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1) Fetch on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("https://book-app-prjy.onrender.com/api/books");
        setAllBooks(res.data);
        setBooks(res.data);
        setGenres([...new Set(res.data.map((b) => b.genre).filter(Boolean))]);
        setLocations([
          ...new Set(res.data.map((b) => b.location).filter(Boolean)),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 2) Re-filter
  useEffect(() => {
    let filtered = allBooks;
    if (filters.genre)
      filtered = filtered.filter((b) => b.genre === filters.genre);
    if (filters.location)
      filtered = filtered.filter((b) => b.location === filters.location);
    setBooks(filtered);
  }, [filters, allBooks]);

  // 3) Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://book-app-prjy.onrender.com/api/books/${id}?owner=${user._id}`
      );
      setAllBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  if (loading) return <p className="p-4">Loading books...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book Listings</h1>

      <SearchFilter
        filters={filters}
        setFilters={setFilters}
        genres={genres}
        locations={locations}
      />

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              currentUserId={user?._id}
              onDelete={() => handleDelete(book._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
