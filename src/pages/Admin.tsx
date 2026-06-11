import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { supabase, isSupabaseConfigured, type Partner } from '../lib/supabase'
import { seedPartners } from '../data/partners'

const emptyForm = {
  id: '',
  name: '',
  category: '',
  description: '',
  website: '',
  phone: '',
  email: '',
  logo_url: '',
}

export default function Admin() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  async function loadPartners() {
    setLoading(true)
    if (!isSupabaseConfigured) {
      setPartners(seedPartners)
      setLoading(false)
      return
    }
    const { data, error } = await supabase.from('partners').select('*').order('name')
    if (error || !data || data.length === 0) {
      setPartners(seedPartners)
    } else {
      setPartners(data as Partner[])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadPartners()
  }, [])

  function startEdit(partner: Partner) {
    setForm({
      id: partner.id,
      name: partner.name,
      category: partner.category ?? '',
      description: partner.description ?? '',
      website: partner.website ?? '',
      phone: partner.phone ?? '',
      email: partner.email ?? '',
      logo_url: partner.logo_url ?? '',
    })
    setLogoFile(null)
  }

  function resetForm() {
    setForm(emptyForm)
    setLogoFile(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      setError('Connect Supabase (set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) to add or edit partners.')
      return
    }
    setSaving(true)
    setError(null)

    let logoUrl = form.logo_url

    if (logoFile) {
      const ext = logoFile.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('partner-logos')
        .upload(path, logoFile, { upsert: true })

      if (uploadError) {
        setError(uploadError.message)
        setSaving(false)
        return
      }

      const { data } = supabase.storage.from('partner-logos').getPublicUrl(path)
      logoUrl = data.publicUrl
    }

    const payload = {
      name: form.name,
      category: form.category || null,
      description: form.description || null,
      website: form.website || null,
      phone: form.phone || null,
      email: form.email || null,
      logo_url: logoUrl || null,
    }

    const result = form.id
      ? await supabase.from('partners').update(payload).eq('id', form.id)
      : await supabase.from('partners').insert(payload)

    if (result.error) setError(result.error.message)
    else {
      resetForm()
      await loadPartners()
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this partner?')) return
    const { error } = await supabase.from('partners').delete().eq('id', id)
    if (error) setError(error.message)
    else await loadPartners()
  }

  function downloadCsv() {
    const headers = ['name', 'category', 'description', 'website', 'phone', 'email', 'logo_url']
    const rows = partners.map((p) =>
      headers.map((h) => {
        const value = (p as unknown as Record<string, string | null>)[h] ?? ''
        return `"${String(value).replace(/"/g, '""')}"`
      }).join(',')
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'partners.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const stats = useMemo(() => {
    const byCategory = new Map<string, number>()
    for (const p of partners) {
      const cat = p.category || 'Uncategorised'
      byCategory.set(cat, (byCategory.get(cat) ?? 0) + 1)
    }
    return {
      total: partners.length,
      withLogo: partners.filter((p) => p.logo_url).length,
      categories: Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]),
    }
  }, [partners])

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-navy">Admin: Manage Partners</h1>
        <div className="flex gap-3">
          <button onClick={downloadCsv} className="bg-teal text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity">
            Download CSV
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('lbc_admin_authed'); window.location.reload() }}
            className="border border-navy text-navy px-4 py-2 rounded-md font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-sand rounded-lg p-5 text-center">
          <p className="text-3xl font-bold text-navy">{stats.total}</p>
          <p className="text-sm text-gray-600">Total Partners</p>
        </div>
        <div className="bg-sand rounded-lg p-5 text-center">
          <p className="text-3xl font-bold text-navy">{stats.withLogo}</p>
          <p className="text-sm text-gray-600">With Logo</p>
        </div>
        <div className="bg-sand rounded-lg p-5">
          <p className="text-sm font-semibold text-navy mb-2">By Category</p>
          <ul className="text-sm text-gray-700 space-y-1 max-h-24 overflow-y-auto">
            {stats.categories.length === 0 && <li className="text-gray-400">No data</li>}
            {stats.categories.map(([cat, count]) => (
              <li key={cat} className="flex justify-between">
                <span>{cat}</span>
                <span className="font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-sand rounded-lg p-6 mb-10 grid sm:grid-cols-2 gap-4">
        <h2 className="sm:col-span-2 text-xl font-semibold text-navy">
          {form.id ? 'Edit Partner' : 'Add New Partner'}
        </h2>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Category</label>
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-navy mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Website</label>
          <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Email</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1">Logo</label>
          {form.logo_url && <img src={form.logo_url} alt="" className="h-12 mb-2 object-contain bg-white rounded p-1" />}
          <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm" />
        </div>
        <div className="sm:col-span-2 flex gap-3">
          <button type="submit" disabled={saving}
            className="bg-navy text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? 'Saving...' : form.id ? 'Update Partner' : 'Add Partner'}
          </button>
          {form.id && (
            <button type="button" onClick={resetForm} className="px-6 py-2 rounded-md font-semibold border border-navy text-navy">
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold text-navy mb-4">Current Partners</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-2">Logo</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Website</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className="border-b border-gray-100">
                  <td className="px-4 py-2">
                    <img src={p.logo_url || '/logo.jpeg'} alt="" className="h-10 w-10 object-contain bg-sand rounded p-1" />
                  </td>
                  <td className="px-4 py-2 font-medium text-navy">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2 truncate max-w-[160px]">{p.website}</td>
                  <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                    <button onClick={() => startEdit(p)} className="text-teal hover:underline">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
