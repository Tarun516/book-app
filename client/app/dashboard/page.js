// app/dashboard/page.js
'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Dashboard() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'seeker';
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    city: '',
    contact: '',
    // Ideally, owner id or info should be managed via authentication context
    owner: 'owner_id_placeholder',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://5000-idx-book-app-1744469142609.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev/api/books', formData);
      setMessage(res.data.message);
      setFormData({
        title: '',
        author: '',
        genre: '',
        city: '',
        contact: '',
        owner: 'owner_id_placeholder',
      });
    } catch (error) {
      setMessage('Error adding book listing.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      {role === 'owner' ? (
        <div className="mb-8 bg-white p-6 rounded shadow">
          <h3 className="text-2xl mb-4">Add New Book Listing</h3>
          <form onSubmit={addBook}>
            <input 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
            <input 
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
            <input 
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre (optional)"
              className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
            <input 
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City/Location"
              className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
            <input 
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Email/Phone"
              className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
              Add Book
            </button>
          </form>
          {message && <p className="mt-4 text-center text-green-600">{message}</p>}
        </div>
      ) : (
        <p className="mb-8 text-center text-gray-600">Aap Book Listings browse kar sakte hain.</p>
      )}
      <div className="text-center">
        <Link href="/listings" className="text-blue-600 underline">
          Browse All Listings
        </Link>
      </div>
    </div>
  );
}
