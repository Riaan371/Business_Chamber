import { useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured, type Partner } from '../lib/supabase'
import { seedPartners } from '../data/partners'
import PageHero from '../components/PageHero'

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured) {
        setPartners(seedPartners)
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        setPartners(seedPartners)
      } else {
        setPartners((data ?? []) as Partner[])
      }
      setLoading(false)
    }
    load()
  }, [])

  const categories = useMemo(() => {
    const set = new Set(partners.map((p) => p.category).filter(Boolean) as string[])
    return ['All', ...Array.from(set).sort()]
  }, [partners])

  const filtered = partners.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div>
      <PageHero
        title="Our Partners"
        subtitle="Browse the ethical, vetted businesses in our chamber network."
        seed={4004}
      />

      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <input
            type="text"
            placeholder="Search partners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cobalt"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cobalt"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {loading && <p className="text-gray-500">Loading partners...</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-gray-500">No partners found.</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((partner) => (
            <div
              key={partner.id}
              className="card-hover bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-sm border border-gray-100 border-t-4 border-t-cobalt"
            >
              <img
                src={partner.logo_url || '/logo.jpeg'}
                alt={partner.name}
                className="h-20 w-20 object-contain mb-4 rounded-md bg-white p-1"
              />
              <h3 className="font-semibold text-navy text-lg">{partner.name}</h3>
              {partner.category && (
                <p className="text-xs uppercase tracking-wide text-cobalt mb-2">{partner.category}</p>
              )}
              {partner.description && (
                <p className="text-sm text-gray-700 mb-3">{partner.description}</p>
              )}
              <div className="text-sm space-y-1">
                {partner.website && (
                  <p>
                    <a
                      href={/^https?:\/\//i.test(partner.website) ? partner.website : `https://${partner.website}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cobalt font-medium hover:underline"
                    >
                      Visit Website
                    </a>
                  </p>
                )}
                {partner.phone && <p className="text-gray-600">{partner.phone}</p>}
                {partner.email && (
                  <p>
                    <a href={`mailto:${partner.email}`} className="text-gray-600 hover:underline break-all">
                      {partner.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
