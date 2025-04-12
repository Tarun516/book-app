'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function BookDetailPage({ params }) {
  const { id } = params;
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError('Error fetching book details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBook();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update book status');
      }
      
      const updatedBook = await response.json();
      setBook(updatedBook);
    } catch (err) {
      console.error(err);
      alert('Failed to update status. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="h-6 bg-gray-200 rounded mb-6 w-1/3"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-gray-200 h-72 w-full md:w-64 rounded-md"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          {error || 'Book not found'}
        </div>
        <div className="mt-4">
          <Link href="/books" className="text-blue-600 hover:text-blue-800">
            ← Back to all books
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && book.owner._id === user._id;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Link href="/books" className="text-blue-600 hover:text-blue-800 inline-flex items-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to all books
      </Link>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative h-72 w-full md:w-56 bg-gray-200 rounded-md overflow-hidden">
              <Image 
                src={book.coverImage || '/default-book.jpg'} 
                alt={book.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  book.status === 'available' ? 'bg-green-100 text-green-800' :
                  book.status === 'rented' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                </span>
              </div>
              
              {book.genre && (
                <div className="mb-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Genre:</span> {book.genre}
                  </p>
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-gray-700">
                  <span className="font-medium">Location:</span> {book.location}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-semibold mb-2">Owner Information</h3>
                <p><span className="font-medium">Name:</span> {book.owner.name}</p>
                <p><span className="font-medium">Email:</span> {book.owner.email}</p>
                <p><span className="font-medium">Mobile:</span> {book.owner.mobileNumber}</p>
              </div>
              
              {isOwner && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Update Status</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleStatusChange('available')}
                      className={`px-3 py-1 rounded border ${
                        book.status === 'available' 
                          ? 'bg-green-100 text-green-800 border-green-300' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Available
                    </button>
                    <button 
                      onClick={() => handleStatusChange('rented')}
                      className={`px-3 py-1 rounded border ${
                        book.status === 'rented' 
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-300' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Rented
                    </button>
                    <button 
                      onClick={() => handleStatusChange('exchanged')}
                      className={`px-3 py-1 rounded border ${
                        book.status === 'exchanged' 
                          ? 'bg-blue-100 text-blue-800 border-blue-300' 
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Exchanged
                    </button>
                  </div>
                </div>
              )}
              
              {!user && (
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <p className="text-blue-800">
                    <Link href="/login" className="font-medium underline">Login</Link> or <Link href="/register" className="font-medium underline">Register</Link> to contact the book owner.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}