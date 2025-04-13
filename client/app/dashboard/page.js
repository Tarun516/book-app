"use client";

import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const role = user?.role?.toLowerCase() || "seeker";

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
  });
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState("");
  const [myListings, setMyListings] = useState([]);

  // Load user's listings
  useEffect(() => {
    if (role === "owner") {
      axios
        .get("http://localhost:5000/api/books")
        .then((res) => {
          const ownBooks = res.data.filter((b) => b.owner?._id === user._id);
          setMyListings(ownBooks);
        })
        .catch((err) => console.error("Error loading listings:", err));
    }
  }, [user, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    data.append("owner", user._id);

    try {
      const res = await axios.post("http://localhost:5000/api/books", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
      setFormData({
        title: "",
        author: "",
        genre: "",
        location: "",
        contact: "",
      });
      setCoverFile(null);

      // Update listings
      const book = res.data.book;
      setMyListings((prev) => [book, ...prev]);
    } catch (error) {
      console.error("Error creating book:", error);
      setMessage("Error adding book listing.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl text-white font-bold mb-6">Dashboard</h2>

      {role === "owner" ? (
        <>
          {/* 📚 Add Book Form */}
          <div className="mb-8 bg-white p-6 rounded shadow">
            <h3 className="text-2xl text-black font-semibold mb-4">
              Add New Book Listing
            </h3>
            <form onSubmit={addBook} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full border p-2 text-black rounded focus:outline-blue-500"
              />
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                required
                className="w-full border p-2 text-black rounded focus:outline-blue-500"
              />
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre (optional)"
                className="w-full border p-2 text-black rounded focus:outline-blue-500"
              />
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City / Location"
                required
                className="w-full border p-2 text-black rounded focus:outline-blue-500"
              />
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Email / Phone"
                required
                className="w-full border p-2 text-black rounded focus:outline-blue-500"
              />
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Cover Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-black"
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

          {/* 👁️ Owner Listings */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl text-black font-semibold mb-4">
              Your Listings
            </h3>
            {myListings.length === 0 ? (
              <p className="text-gray-600">No listings yet.</p>
            ) : (
              <ul className="space-y-4">
                {myListings.map((book) => (
                  <li
                    key={book._id}
                    className="border rounded p-4 bg-gray-50 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-lg font-semibold">{book.title}</p>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                    </div>
                    <Link
                      href={`/listings/edit/${book._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        // 👥 Seeker View
        <div className="mb-8 text-center">
          <p className="text-gray-600 mb-4">
            You're logged in as a book seeker.
          </p>
          <Link
            href="/listings"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            View All Listings
          </Link>
        </div>
      )}
    </div>
  );
}
