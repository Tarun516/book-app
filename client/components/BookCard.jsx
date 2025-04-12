import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book }) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    rented: 'bg-yellow-100 text-yellow-800',
    exchanged: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="card">
      <div className="relative h-40 mb-4 bg-gray-200 rounded-md overflow-hidden">
        <Image 
          src={book.coverImage || '/default-book.jpg'} 
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
      <p className="text-gray-600 mb-2">by {book.author}</p>
      <p className="text-gray-600 text-sm mb-2">
        <span className="font-medium">Location:</span> {book.location}
      </p>
      <div className="flex justify-between items-center mt-3">
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[book.status]}`}>
          {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
        </span>
        <Link href={`/books/${book._id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}