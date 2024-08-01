import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const supabase = createPagesServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    headers: request.headers,
    cookies: {
      get: (name) => request.cookies.get(name)?.value,
      set: (name, value, options) => {
        // Update cookies on response
        const response = NextResponse.next();
        response.cookies.set(name, value, options);
        return response;
      },
      remove: (name, options) => {
        // Remove cookies on response
        const response = NextResponse.next();
        response.cookies.delete(name, options);
        return response;
      }
    },
  });

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    // Handle error
  }

  return NextResponse.next();
}
