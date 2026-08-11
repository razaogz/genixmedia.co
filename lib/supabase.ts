import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured && typeof window !== 'undefined') {
  console.warn(
    'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable form submissions.'
  );
}

function createStubClient(): SupabaseClient {
  const fail = () => ({
    error: new Error('Supabase environment variables are not configured.'),
    data: null,
    count: null,
    status: 0,
    statusText: 'Not configured',
  });
  const chain = new Proxy(
    {},
    {
      get: () => () => chain,
    }
  ) as Record<string, (...args: unknown[]) => unknown>;
  const from = new Proxy(
    {},
    {
      get: (_t, prop) => {
        if (prop === 'insert') return () => Promise.resolve(fail());
        return () => chain;
      },
    }
  ) as unknown as SupabaseClient['from'];
  return { from } as unknown as SupabaseClient;
}

export const supabase: SupabaseClient = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    })
  : createStubClient();
