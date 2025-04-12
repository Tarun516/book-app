'use client';
import { useState } from 'react';

export default function SearchFilter({ onFilter }) {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    genre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      title: '',
      location: '',
      genre: ''
    });
    onFilter({});
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-medium mb-4">Filter Books</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={filters.title}
              onChange={handleChange}
              className="input-field"
              placeholder="Search by title"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="input-field"
              placeholder="City or area"
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={filters.genre}
              onChange={handleChange}
              className="input-field"
              placeholder="Fiction, Science, etc."
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
}