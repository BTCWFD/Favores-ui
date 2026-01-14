import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'your-project-url.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key';

if (!isConfigured) {
    console.warn('Supabase is not configured. Real-time features and database operations will be disabled.');
}

// Create a dummy client if not configured to prevent runtime crashes during UI review
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.supabase.co', 'placeholder-key');
