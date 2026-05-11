import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://fhglyghtredllozgozvu.supabase.co'
const supabaseKey = 'sb_publishable_GXDiEADXjF9832Z28TcYxw_hQyjcwzX'

export const supabase = createClient(supabaseUrl, supabaseKey)