import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project')
)

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder'
)

export type Partner = {
  id: string
  name: string
  category: string | null
  description: string | null
  website: string | null
  phone: string | null
  email: string | null
  logo_url: string | null
  created_at: string
}

export type Profile = {
  id: string
  email: string
  role: 'admin' | 'member'
}
