// app/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://5000-idx-book-app-1744469142609.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev/api/auth/login', credentials);
      setMessage(res.data.message);
      // Redirect based on user role (using query string as demo)
      if (res.data.user.role === 'Owner') {
        router.push('/dashboard?role=owner');
      } else {
        router.push('/dashboard?role=seeker');
      }
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <input 
          name="email" 
          type="email"
          onChange={handleChange} 
          placeholder="Email" 
          className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
        <input 
          name="password" 
          type="password"
          onChange={handleChange} 
          placeholder="Password" 
          className="w-full border p-2 rounded mb-4 focus:outline-blue-500" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
