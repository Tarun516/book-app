'use client';

export default function BookCard({ book }) {
  return (
    <div className="bg-white rounded shadow p-4 hover:shadow-lg transition duration-200">
      <h3 className="text-xl font-bold mb-1">{book.title}</h3>
      <p className="text-gray-700">By: {book.author}</p>
      <p className="mt-2 text-sm text-gray-600">
        {book.owner?.name} | {book.owner?.email}
      </p>
      <p className="mt-2">Location: {book.city}</p>
      <p className="mt-2 font-semibold">Status: {book.status}</p>
    </div>
  );
}
