'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span>📚</span> BookBridge
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/books" className="hover:text-blue-200 transition">Browse Books</Link>
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="hover:text-blue-200 transition"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/books" className="block hover:text-blue-200 transition py-2">
              Browse Books
            </Link>
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="block hover:text-blue-200 transition py-2">
                  Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="block w-full text-left hover:text-blue-200 transition py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block hover:text-blue-200 transition py-2">
                  Login
                </Link>
                <Link href="/register" className="block hover:text-blue-200 transition py-2">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
