import { createServerSupabaseClient, type CookieOptions } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch (error) {
          // Handle errors if needed
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch (error) {
          // Handle errors if needed
        }
      },
    },
  });
}
