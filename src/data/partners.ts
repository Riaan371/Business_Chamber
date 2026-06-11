import type { Partner } from '../lib/supabase'

// Fallback/demo data shown when Supabase isn't configured yet, or as
// seed examples for what a partner record looks like.
export const seedPartners: Partner[] = [
  {
    id: 'seed-sparkbit',
    name: 'Sparkbit',
    category: 'Website Design',
    description: 'Website design and digital services. Contact: Riaan van Graan, 079 520 3989.',
    website: 'https://sparkbit.co.za',
    phone: '079 520 3989',
    email: 'hallo@sparkbit.co.za',
    logo_url: '/partners/sparkbit.svg',
    created_at: new Date().toISOString(),
  },
]
