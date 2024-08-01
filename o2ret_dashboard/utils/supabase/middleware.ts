import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerSupabaseClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    getCookie: (name) => request.cookies.get(name)?.value,
    setCookie: (name, value, options) => {
      request.cookies.set({
        name,
        value,
        ...options,
      });
      response.cookies.set({
        name,
        value,
        ...options,
      });
    },
    removeCookie: (name, options) => {
      request.cookies.set({
        name,
        value: '',
        ...options,
      });
      response.cookies.set({
        name,
        value: '',
        ...options,
      });
    },
  });

  await supabase.auth.getUser();

  return response;
}
