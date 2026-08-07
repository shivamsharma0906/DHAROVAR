import { createClient } from '@supabase/supabase-js';

let supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key').trim();

if (!supabaseUrl) {
  supabaseUrl = 'https://placeholder.supabase.co';
  console.warn('Warning: VITE_SUPABASE_URL is not defined in environment variables. Using placeholder.');
} else if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Warning: VITE_SUPABASE_ANON_KEY is not defined in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

