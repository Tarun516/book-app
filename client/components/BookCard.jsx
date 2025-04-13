// client/components/BookCard.jsx
"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BookCard({
  book,
  currentUserId,
  onDelete,
  onStatusChange,
}) {
  const isOwner = currentUserId === book.owner?._id;
  const [status, setStatus] = useState(book.status);

  const toggleStatus = async () => {
    const newStatus = status === "Available" ? "Rented/Exchanged" : "Available";
    try {
      await axios.put(`http://localhost:5000/api/books/${book._id}`, {
        status: newStatus,
        owner: currentUserId,
      });
      setStatus(newStatus);
      // inform parent to refresh lists if needed
      if (onStatusChange) onStatusChange(book._id, newStatus);
    } catch (err) {
      console.error("Status toggle error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
      {book.coverUrl && (
        <img
          src={`http://localhost:5000${book.coverUrl}`}
          alt={`${book.title} cover`}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-2xl text-gray-800 font-bold mb-1">Title: {book.title}</h3>
      <p className="text-xl text-gray-700">Author: {book.author}</p>
      <p className="mt-2 text-xl text-gray-600">Genre: {book.genre}</p>
      <p className="mt-2 text-xl text-gray-600">Location: {book.location}</p>
      <p className="mt-2 text-xl text-gray-600">
        Status: <span className="font-semibold">{status}</span>
      </p>

      {isOwner && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={toggleStatus}
            className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600 transition"
          >
            {status === "Available"
              ? "Mark as Rented/Exchanged"
              : "Mark as Available"}
          </button>
          <Link
            href={`/listings/edit/${book._id}`}
            className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 transition text-center"
          >
            Edit
          </Link>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
