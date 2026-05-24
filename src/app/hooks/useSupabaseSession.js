// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from '@/lib/supabaseClient'


// export function useSupabaseAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     let isMounted = true;

//     async function loadUser() {
//       const { data } = await supabase.auth.getUser();

//       if (!isMounted) return;

//       setUser(data?.user ?? null);
//       setLoading(false); // 🔴 THIS was missing or never reached
//     }

//     loadUser();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (!isMounted) return;
//       setUser(session?.user ?? null);
//     });

//     return () => {
//       isMounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   return { user, loading };
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      try {
        // Get session first (more reliable than getUser for OAuth)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error) {
        console.error("Something went wrong, please try again:", error);
        if (isMounted) {
          setUser(null);
          setSession(null);
          setLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return { user, session, loading, signOut };
}