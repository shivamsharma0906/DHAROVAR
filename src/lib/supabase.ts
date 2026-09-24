import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

const isMissingConfig =
  !rawUrl ||
  !rawKey ||
  rawUrl === 'https://placeholder.supabase.co' ||
  rawKey === 'placeholder-key';

if (isMissingConfig) {
  const errorMessage =
    '[Supabase Config Error]: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY are missing or set to placeholders! ' +
    'Please define valid Supabase credentials in your .env.local file (for local development) ' +
    'and in your Vercel Project Environment Variables (for production). See .env.example for details.';

  if (import.meta.env.DEV) {
    throw new Error(errorMessage);
  } else {
    console.error(errorMessage);
  }
}

// Sanitize URL protocol
let supabaseUrl = rawUrl || 'https://placeholder.supabase.co';
if (supabaseUrl && !supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
  supabaseUrl = `https://${supabaseUrl}`;
}

const supabaseAnonKey = rawKey || 'placeholder-key';

export const isSupabaseConfigured = !isMissingConfig;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SupabaseErrorLike {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
}

export function formatSupabaseError(err: unknown): string {
  if (!isSupabaseConfigured) {
    return 'Supabase is not configured on this deployment! Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Project Settings > Environment Variables, then trigger a Redeploy.';
  }

  if (!err) return 'Unknown error occurred';

  if (typeof err === 'object' && err !== null) {
    const errorObj = err as SupabaseErrorLike;
    const parts: string[] = [];

    if (errorObj.message) {
      if (errorObj.message.includes('Failed to fetch')) {
        return `Network Error: Failed to reach Supabase at "${supabaseUrl}". Please verify VITE_SUPABASE_URL in your Vercel Environment Variables.`;
      }
      parts.push(errorObj.message);
    }
    if (errorObj.details) {
      parts.push(`Details: ${errorObj.details}`);
    }
    if (errorObj.hint) {
      parts.push(`Hint: ${errorObj.hint}`);
    }
    if (errorObj.code) {
      parts.push(`[Code: ${errorObj.code}]`);
    }

    if (parts.length > 0) {
      return parts.join(' | ');
    }
  }

  if (err instanceof Error) {
    if (err.message.includes('Failed to fetch')) {
      return `Network Error: Failed to reach Supabase at "${supabaseUrl}". Please verify VITE_SUPABASE_URL in your Vercel Environment Variables.`;
    }
    return err.message;
  }

  return String(err);
}



