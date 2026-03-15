import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

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
  const { error } = await supabase.from('rsvp').insert([data]);
  if (error) throw error;
}

export async function getAllRSVPs() {
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data as RSVPEntry[];
}

export async function deleteRSVP(id: string) {
  const { error } = await supabase.from('rsvp').delete().eq('id', id);
  if (error) throw error;
}