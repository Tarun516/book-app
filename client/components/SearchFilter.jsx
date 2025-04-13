// client/components/SearchFilter.jsx
'use client';

export default function SearchFilter({ filters, setFilters, genres, locations }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ genre: '', location: '' });
  };

  return (
    <form onSubmit={e => e.preventDefault()} className="mb-6 flex space-x-4">
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        name="location"
        value={filters.location}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">All Locations</option>
        {locations.map(l => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleReset}
        className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition"
      >
        Reset
      </button>
    </form>
  );
}
