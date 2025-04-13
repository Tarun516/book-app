// client/app/dashboard/page.js
"use client";

import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const role = user?.role.toLowerCase() || "seeker";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
    owner: user?._id,
  });
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const addBook = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });
    if (coverFile) {
      data.append("cover", coverFile);
    }

    try {
      const res = await axios.post("http://localhost:5000/api/books", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      // reset form
      setFormData({
        title: "",
        author: "",
        genre: "",
        location: "",
        contact: "",
        owner: user?._id,
      });
      setCoverFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Error adding book listing.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {role === "owner" ? (
        <div className="mb-8 bg-white p-6 rounded shadow">
          <h3 className="text-2xl font-semibold mb-4">Add New Book Listing</h3>
          <form onSubmit={addBook} className="space-y-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full border p-2 rounded focus:outline-blue-500"
            />
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
              className="w-full border p-2 rounded focus:outline-blue-500"
            />
            <input
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Genre (optional)"
              className="w-full border p-2 rounded focus:outline-blue-500"
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City / Location"
              required
              className="w-full border p-2 rounded focus:outline-blue-500"
            />
            <input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Email / Phone"
              required
              className="w-full border p-2 rounded focus:outline-blue-500"
            />

            <div>
              <label className="block mb-1 font-medium">
                Cover Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              Add Book
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-600">{message}</p>
          )}
        </div>
      ) : (
        <p className="mb-8 text-center text-gray-600">
          You can browse the book listings.
        </p>
      )}
    </div>
  );
}
