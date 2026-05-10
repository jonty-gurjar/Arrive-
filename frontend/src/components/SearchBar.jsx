import React, { useState } from 'react';
import { CalendarDays, MapPin, Search } from 'lucide-react';

const SearchBar = ({ className = '', onSearch }) => {
  const [form, setForm] = useState({
    location: '',
    date: '',
  });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitSearch = (event) => {
    event.preventDefault();
    onSearch?.(form);
  };

  return (
    <form
      onSubmit={submitSearch}
      className={`bg-white rounded-[32px] md:rounded-full shadow-2xl shadow-gray-200/60 p-6 md:px-10 md:py-4 flex flex-col md:flex-row items-stretch md:items-center gap-5 md:gap-6 w-[90%] md:w-max max-w-6xl justify-between border border-gray-100 z-20 ${className}`}
    >
      <label className="flex items-center gap-4 w-full md:w-[280px]">
        <span className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center shrink-0">
          <MapPin size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-black font-bold text-sm">Location</span>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={updateField}
            placeholder="Where are you going?"
            className="mt-1 w-full bg-transparent text-sm text-gray-600 outline-none placeholder:text-gray-400"
          />
        </span>
      </label>

      <div className="hidden md:block h-10 w-px bg-gray-200" />
      <div className="md:hidden w-full h-px bg-gray-100" />

      <label className="flex items-center gap-4 w-full md:w-[230px]">
        <span className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center shrink-0">
          <CalendarDays size={22} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-black font-bold text-sm">Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={updateField}
            className="mt-1 w-full bg-transparent text-sm text-gray-600 outline-none"
          />
        </span>
      </label>

      <button
        type="submit"
        className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full transition-all w-full md:w-auto md:ml-4 shadow-lg shadow-black/20 flex items-center justify-center gap-2"
      >
        <Search size={18} />
        Search
      </button>
    </form>
  );
};

export default SearchBar;
