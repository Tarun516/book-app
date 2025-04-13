// client/components/BookCard.jsx
"use client";

import Link from "next/link";

export default function BookCard({ book, currentUserId, onDelete }) {
  const isOwner = currentUserId === book.owner?._id;

  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-lg transition">
      {book.coverUrl && (
        <img
          src={`http://localhost:5000${book.coverUrl}`}
          alt={`${book.title} cover`}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}

      <h3 className="text-xl font-bold mb-1">{book.title}</h3>
      <p className="text-gray-700">By: {book.author}</p>
      <p className="mt-2 text-gray-600">Genre: {book.genre}</p>
      <p className="mt-2 text-gray-600">Location: {book.location}</p>
      <p className="mt-2 text-gray-600">
        Owner: {book.owner?.name} ({book.owner?.email})
      </p>

      {isOwner && (
        <div className="mt-4 flex space-x-2">
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
