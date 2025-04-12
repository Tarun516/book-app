// client/app/dashboard/seeker/page.js
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BookCard from '@/components/BookCard';

export default function SeekerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recentBooks, setRecentBooks] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState(['Fiction', 'Science', 'Biography']);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect if not logged in or not a seeker
    if (!loading && (!user || user.role !== 'seeker')) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchRecentBooks();
    }
  }, [user, loading, router]);

  const fetchRecentBooks = async () => {
    try {
      // Fetch most recent books
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books?limit=4`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      setRecentBooks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || (user && isLoading)) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}!</h1>
        <p className="text-gray-600">
          Find and connect with book owners in your area
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-8">
        <h2 className="text-xl font-semibold mb-3">Ready to find a book?</h2>
        <p className="mb-4">
          Browse our collection of books available for exchange or rent in your area.
        </p>
        <Link href="/books" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition duration-300">
          Browse All