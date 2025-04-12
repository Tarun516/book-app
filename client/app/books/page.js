'use client';
import { useState, useEffect } from 'react';
import BookCard from '@/components/BookCard';
import SearchFilter from '@/components/SearchFilter';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBooks = async (filters = {}) => {
    try {
      setIsLoading(true);
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/books?${queryParams.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError('Error fetching books. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFilter = (filters) => {
    fetchBooks(filters);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
        <p className="text-gray-600">
          Discover books available for exchange or rent in your area
        </p>
      </div>
      
      <SearchFilter onFilter={handleFilter} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No books found matching your criteria.</p>
          <p className="mt-2">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
}
