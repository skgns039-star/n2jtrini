import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fbjqrhlidescemxrvncl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFyaGxpZGVzY2VteHJ2bmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwMDUyNTUsImV4cCI6MjA5NDU4MTI1NX0.NfB72XiM-PEX0lZSEpx4QZifq9JHIFUKoZ2FkDEvYNk';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Form submission will fail.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
