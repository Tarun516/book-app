// client/components/Navbar.jsx
'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">📚 Book Exchange</h1>
        <div className="space-x-4 flex items-center">
          <Link href="/">Home</Link>

          {user ? (
            <>
              <Link href={`/dashboard?role=${user.role.toLowerCase()}`}>
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  // after logout, redirect to home
                  window.location.href = '/';
                }}
                className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/register">Register</Link>
              <Link href="/">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
