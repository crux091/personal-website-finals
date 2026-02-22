/**
 * Supabase Client Singleton
 * 
 * Creates a single reusable Supabase client instance for the application.
 * Uses public anon key for client-side operations with RLS enabled.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
}

// Singleton pattern to prevent multiple instances
let supabaseInstance: SupabaseClient | null = null

export const supabase = supabaseInstance ?? createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

if (!supabaseInstance) {
  supabaseInstance = supabase
}
