// client/app/listings/edit/[id]/page.jsx
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function EditListingPage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ fix this line
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    location: "",
    contact: "",
  });
  const [coverFile, setCoverFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    axios
      .get("https://book-app-prjy.onrender.com/api/books")
      .then((res) => {
        const book = res.data.find((b) => b._id === id);
        if (!book) throw new Error("Not found");
        if (book.owner._id !== user._id) {
          router.push("/listings");
          return;
        }
        setFormData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          location: book.location,
          contact: book.contact,
        });
      })
      .catch(() => router.push("/listings"))
      .finally(() => setLoading(false));
  }, [id, user, router]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    if (coverFile) data.append("cover", coverFile);
    data.append("owner", user._id); // ✅ Add this for backend check

    try {
      await axios.put(`https://book-app-prjy.onrender.com/api/books/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Book updated successfully.");
      setTimeout(() => router.push("/listings"), 1000);
    } catch (err) {
      console.error(err);
      setMessage("Error updating book.");
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl text-white font-bold mb-6">Edit Listing</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border p-2 text-black  rounded focus:outline-blue-500"
        />
        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          required
          className="w-full border p-2 text-black  rounded focus:outline-blue-500"
        />
        <input
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full border p-2 text-black  rounded focus:outline-blue-500"
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City / Location"
          required
          className="w-full border p-2 text-black  rounded focus:outline-blue-500"
        />
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Email / Phone"
          required
          className="w-full border p-2 text-black  rounded focus:outline-blue-500"
        />

        <div>
          <label className="block mb-1 font-medium">
            Cover Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-black "
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black  py-2 rounded hover:bg-yellow-600 transition"
        >
          Update Book
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
