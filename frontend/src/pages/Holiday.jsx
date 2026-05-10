import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Binoculars,
  Building2,
  Car,
  ChevronDown,
  Search,
  Utensils,
  X,
} from 'lucide-react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { createBooking, getPackages, getSession } from '../lib/api.js'

const heroImageUrl =
  'https://images.pexels.com/photos/2810267/pexels-photo-2810267.jpeg'

const filterOptions = {
  sortBy: ['Recommended', 'Price Low to High', 'Price High to Low'],
  packageType: ['Family', 'Couple', 'Group', 'Honeymoon', 'Luxury', 'Adventure'],
  price: ['Under $150', '$150 - $250', 'Above $250'],
  flight: ['With Flight', 'Without Flight'],
  themes: ['Beach', 'City', 'Luxury', 'Adventure', 'Nature', 'Culture', 'Wildlife'],
}

const filterLabels = {
  sortBy: 'Sort By',
  packageType: 'Package Type',
  price: 'Price',
  flight: 'Flight',
  themes: 'Themes',
}

const sortMap = {
  'Price Low to High': 'price-low-to-high',
  'Price High to Low': 'price-high-to-low',
}

const initialBookingForm = {
  date: '',
  guests: '2 People',
  name: '',
  email: '',
  notes: '',
}

const Holiday = () => {
  const [fromQuery, setFromQuery] = useState('New Delhi')
  const [searchQuery, setSearchQuery] = useState('Goa')
  const [packages, setPackages] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [openFilter, setOpenFilter] = useState(null)
  const [activeFilters, setActiveFilters] = useState({
    sortBy: '',
    packageType: '',
    price: '',
    flight: '',
    themes: '',
  })
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [bookingForm, setBookingForm] = useState(initialBookingForm)
  const [bookingError, setBookingError] = useState('')
  const [bookingStatus, setBookingStatus] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  useEffect(() => {
    const loadPackages = async () => {
      try {
        setIsLoading(true)
        setError('')
        const data = await getPackages()
        setPackages(data.packages || [])
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Could not load packages')
      } finally {
        setIsLoading(false)
      }
    }

    loadPackages()
  }, [])

  const visiblePackages = useMemo(() => {
    let result = [...packages]

    if (activeFilters.packageType) {
      result = result.filter((item) => item.packageType === activeFilters.packageType)
    }

    if (activeFilters.flight) {
      result = result.filter((item) => item.flight === activeFilters.flight)
    }

    if (activeFilters.themes) {
      result = result.filter((item) => item.theme === activeFilters.themes)
    }

    if (activeFilters.price === 'Under $150') {
      result = result.filter((item) => item.priceValue < 150)
    }

    if (activeFilters.price === '$150 - $250') {
      result = result.filter((item) => item.priceValue >= 150 && item.priceValue <= 250)
    }

    if (activeFilters.price === 'Above $250') {
      result = result.filter((item) => item.priceValue > 250)
    }

    if (activeFilters.sortBy === 'Price Low to High') {
      result.sort((a, b) => a.priceValue - b.priceValue)
    }

    if (activeFilters.sortBy === 'Price High to Low') {
      result.sort((a, b) => b.priceValue - a.priceValue)
    }

    return result
  }, [activeFilters, packages])

  const selectFilter = (filter, value) => {
    setActiveFilters((current) => ({
      ...current,
      [filter]: value,
    }))
    setOpenFilter(null)
  }

  const resetFilters = async () => {
    setActiveFilters({
      sortBy: '',
      packageType: '',
      price: '',
      flight: '',
      themes: '',
    })
    setOpenFilter(null)
  }

  const openSearchResults = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const data = await getPackages({
        q: searchQuery,
        sortBy: sortMap[activeFilters.sortBy],
      })
      setSearchResults(data.packages || [])
      setIsSearchOpen(true)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Search failed')
    }
  }

  const openBooking = (item) => {
    const session = getSession()
    setSelectedPackage(item)
    setBookingError('')
    setBookingStatus('')
    setBookingForm({
      ...initialBookingForm,
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    })
  }

  const updateBookingForm = (event) => {
    const { name, value } = event.target
    setBookingForm((current) => ({ ...current, [name]: value }))
  }

  const submitBooking = async (event) => {
    event.preventDefault()

    if (!selectedPackage) {
      return
    }

    setBookingError('')
    setBookingStatus('')
    setIsBooking(true)

    try {
      await createBooking({
        packageId: selectedPackage.id,
        location: selectedPackage.place,
        date: bookingForm.date,
        guests: bookingForm.guests,
        name: bookingForm.name,
        email: bookingForm.email,
        notes: bookingForm.notes,
      })

      setBookingStatus('Booking saved. Our team will contact you soon.')
      setBookingForm(initialBookingForm)
    } catch (requestError) {
      setBookingError(requestError instanceof Error ? requestError.message : 'Booking failed')
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-white">
      <section
        className="relative h-[430px] overflow-hidden bg-cover bg-center bg-no-repeat md:h-[460px]"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <Header />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-5 pt-24 md:px-10">
          <div className="max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-white/75">
              Holiday packages
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Find your next holiday
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
              Explore handpicked destinations, easy booking, and memorable travel stays for your next break.
            </p>
            <form
              className="mt-8 grid max-w-4xl overflow-hidden rounded-[24px] bg-white text-black shadow-2xl shadow-black/20 md:grid-cols-[1fr_1fr_180px]"
              onSubmit={openSearchResults}
            >
              <div className="flex min-h-[72px] items-center gap-3 px-4 md:px-5">
                <Search className="shrink-0 text-black/45" size={30} strokeWidth={1.8} />
                <div>
                  <span className="block text-sm font-medium leading-tight text-black/65 md:text-base">
                    From
                  </span>
                  <input
                    value={fromQuery}
                    onChange={(event) => setFromQuery(event.target.value)}
                    placeholder="From city"
                    className="mt-1 h-8 w-full border-0 bg-transparent p-0 text-xl font-medium leading-none text-black outline-none placeholder:text-black/35 md:text-2xl"
                  />
                </div>
              </div>

              <label className="flex min-h-[72px] items-center justify-between gap-3 border-t border-black/20 px-4 md:border-l md:border-t-0 md:px-5">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium leading-tight text-black/65 md:text-base">
                    To Destination/Category
                  </span>
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search destination"
                    className="mt-1 h-8 w-full border-0 bg-transparent p-0 text-xl font-bold leading-none text-black outline-none placeholder:text-black/35 md:text-2xl"
                  />
                </span>
                <ChevronDown className="shrink-0 text-black" size={22} strokeWidth={2.5} />
              </label>

              <button
                type="submit"
                className="m-0 min-h-[72px] rounded-[24px] bg-black px-7 text-2xl font-bold text-white transition hover:bg-blue-400"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="packages" className="bg-white px-5 py-10 text-black md:px-10">
        <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white p-4 shadow-2xl shadow-black/10 md:p-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            {Object.keys(filterOptions).map((filter) => (
              <div key={filter} className="relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm"
                  onClick={() => setOpenFilter(openFilter === filter ? null : filter)}
                >
                  {activeFilters[filter] || filterLabels[filter]}
                  <ChevronDown size={16} />
                </button>

                {openFilter === filter && (
                  <div className="absolute left-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-black/10 bg-white py-2 shadow-xl">
                    {filterOptions[filter].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className="block w-full px-4 py-2 text-left text-sm font-medium text-black/75 hover:bg-black/[0.04]"
                        onClick={() => selectFilter(filter, option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="ml-auto text-sm font-bold text-[#ef3f36]"
              onClick={resetFilters}
            >
              Reset All
            </button>
          </div>

          {error && (
            <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          {isLoading ? (
            <p className="rounded-lg border border-black/10 bg-black/[0.03] p-6 text-center text-black/65">
              Loading packages...
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visiblePackages.map((item) => (
                <article
                  key={item.id || item.title}
                  className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm"
                >
                  <div className="relative p-3">
                    <img
                      src={item.image}
                      alt={item.place}
                      className="h-44 w-full rounded-lg object-cover"
                    />
                    <label className="absolute left-5 top-5 inline-flex items-center gap-2 rounded bg-[#24128f] px-2.5 py-1.5 text-xs font-bold text-white">
                      <input type="checkbox" className="h-4 w-4 accent-white" />
                      Add to Compare
                    </label>
                    <span className="absolute bottom-0 left-5 rounded-full bg-[#1976e8] px-3 py-1 text-sm font-bold text-white">
                      {item.duration}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-bold leading-tight text-[#101828]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-black/55">{item.subtitle}</p>
                    <div className="mt-4 flex items-center gap-4 text-black">
                      <Building2 size={28} />
                      <Binoculars size={28} />
                      <Car size={28} />
                      <Utensils size={28} />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-black/80">
                      {item.highlights.map((highlight) => (
                        <span key={highlight}>
                          <span className="font-bold text-emerald-500">✓</span> {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex items-end justify-between border-t border-black/10 p-5">
                    <div>
                      <p className="text-xs font-semibold">Starting From</p>
                      <p className="text-sm font-semibold text-black/60 line-through">
                        {item.oldPrice}
                      </p>
                      <p className="text-2xl font-black">{item.amount}</p>
                      <p className="text-xs text-black/60">Per Person on twin sharing</p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                      onClick={() => openBooking(item)}
                    >
                      Book Now <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {isSearchOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-sm">
          <div className="max-h-[86vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white text-black shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-black/10 bg-white px-5 py-4">
              <div>
                <h2 className="text-xl font-bold">Package results</h2>
                <p className="text-sm text-black/60">
                  From {fromQuery || 'Any city'} to {searchQuery || 'anywhere'} - {searchResults.length} package{searchResults.length === 1 ? '' : 's'} found
                </p>
              </div>
              <button
                type="button"
                aria-label="Close search results"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <article
                    key={item.id || item.title}
                    className="overflow-hidden rounded-lg border border-black/10"
                  >
                    <img
                      src={item.image}
                      alt={item.place}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/50">
                        {item.category}
                      </p>
                      <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-black/60">{item.place}</p>
                      <p className="mt-4 font-bold">{item.price}</p>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-bold text-white"
                        onClick={() => openBooking(item)}
                      >
                        Book Now <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="md:col-span-3">
                  <p className="rounded-lg border border-black/10 bg-black/[0.03] p-6 text-center text-black/65">
                    No packages match this search.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedPackage && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-5 py-8 backdrop-blur-sm">
          <form
            className="w-full max-w-xl rounded-lg bg-white p-6 text-black shadow-2xl"
            onSubmit={submitBooking}
          >
            <div className="mb-5 flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-black/45">
                  Booking request
                </p>
                <h2 className="mt-2 text-2xl font-black">{selectedPackage.title}</h2>
                <p className="text-sm text-black/60">{selectedPackage.place}</p>
              </div>
              <button
                type="button"
                aria-label="Close booking form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white"
                onClick={() => setSelectedPackage(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold">Travel date</span>
                <input
                  type="date"
                  name="date"
                  value={bookingForm.date}
                  onChange={updateBookingForm}
                  required
                  className="mt-2 h-11 w-full rounded-lg border border-black/15 px-3 outline-none focus:border-black"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">Guests</span>
                <select
                  name="guests"
                  value={bookingForm.guests}
                  onChange={updateBookingForm}
                  className="mt-2 h-11 w-full rounded-lg border border-black/15 px-3 outline-none focus:border-black"
                >
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold">Name</span>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={updateBookingForm}
                  required
                  className="mt-2 h-11 w-full rounded-lg border border-black/15 px-3 outline-none focus:border-black"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold">Email</span>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={updateBookingForm}
                  required
                  className="mt-2 h-11 w-full rounded-lg border border-black/15 px-3 outline-none focus:border-black"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-bold">Notes</span>
              <textarea
                name="notes"
                value={bookingForm.notes}
                onChange={updateBookingForm}
                rows={3}
                className="mt-2 w-full resize-none rounded-lg border border-black/15 px-3 py-2 outline-none focus:border-black"
                placeholder="Airport pickup, hotel preference, special occasion"
              />
            </label>

            {bookingError && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {bookingError}
              </p>
            )}
            {bookingStatus && (
              <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                {bookingStatus}
              </p>
            )}

            <button
              type="submit"
              disabled={isBooking}
              className="mt-5 w-full rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isBooking ? 'Saving booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      )}
    </main>
  )
}

export default Holiday
