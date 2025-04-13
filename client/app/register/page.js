// app/register/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    role: 'Owner',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData); // Log the form data

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log("Response from backend: ", res); // Log the response from the backend
      setMessage(res.data.message);
      router.push('/');
    } catch (error) {
      console.error("Axios Error Details:", error.response ? error.response.data : error.message); // Log the error
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-black text-center mb-6">Register</h2>
        <input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 text-black rounded mb-4 focus:outline-blue-500" />
        <input
          name="mobileNumber"
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full border p-2 text-black  rounded mb-4 focus:outline-blue-500" />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 text-black  rounded mb-4 focus:outline-blue-500" />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 text-black  rounded mb-4 focus:outline-blue-500" />
        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4 text-black  focus:outline-blue-500">
          <option value="Owner">Owner</option>
          <option value="Seeker">Seeker</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Register
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}
