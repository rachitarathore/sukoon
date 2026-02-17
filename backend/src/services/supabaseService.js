// Wraps Supabase calls for moods and journal entries.
import { createClient } from '@supabase/supabase-js';
import { config } from '../config.js';

if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
  // Keep startup simple while still surfacing configuration issues.
  console.warn('Supabase credentials missing. Database features will fail until configured.');
}

const supabase = createClient(config.supabaseUrl || '', config.supabaseServiceRoleKey || '');

export async function saveMood({ userId, mood, message }) {
  const { data, error } = await supabase
    .from('moods')
    .insert({ user_id: userId, mood, message })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function getWeeklyMoods(userId) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('moods')
    .select('*')
    .eq('user_id', userId)
    .gte('created_at', sevenDaysAgo)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

export async function saveJournalEntry({ userId, entry, aiSummary }) {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert({ user_id: userId, entry, ai_summary: aiSummary })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function getRecentJournalEntries(userId) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(7);

  if (error) throw error;
  return data;
}
