import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Only create client if keys exist — prevents crash on local dev
const isConfigured = supabaseUrl && 
  supabaseUrl !== 'PASTE_YOUR_PROJECT_URL_HERE' && 
  supabaseKey && 
  supabaseKey !== 'PASTE_YOUR_ANON_KEY_HERE';

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export interface RSVPEntry {
  id?:         string;
  created_at?: string;
  name:        string;
  email:       string;
  phone?:      string;
  guests:      number;
  attendance:  string;
  meal?:       string;
  language?:   string;
  message?:    string;
}

export async function submitRSVP(data: RSVPEntry) {
  if (!supabase) {
    // Dev mode — just log it, don't crash
    console.log('📋 RSVP submitted (Supabase not configured):', data);
    return;
  }
  const { error } = await supabase.from('rsvp').insert([data]);
  if (error) throw error;
}

export async function getAllRSVPs(): Promise<RSVPEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as RSVPEntry[];
}

export async function deleteRSVP(id: string) {
  if (!supabase) return;
  const { error } = await supabase.from('rsvp').delete().eq('id', id);
  if (error) throw error;
}

export { isConfigured };