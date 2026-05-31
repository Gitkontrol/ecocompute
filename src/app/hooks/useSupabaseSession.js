// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from '@/lib/supabaseClient'

// export function useSupabaseAuth() {
//   const [user, setUser] = useState(null);
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;

//     async function loadSession() {
//       try {
//         // Get session first (more reliable than getUser for OAuth)
//         const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
//         if (sessionError) throw sessionError;
        
//         if (!isMounted) return;
        
//         setSession(session);
//         setUser(session?.user ?? null);
//         setLoading(false);
//       } catch (error) {
//         console.error("Something went wrong, please try again:", error);
//         if (isMounted) {
//           setUser(null);
//           setSession(null);
//           setLoading(false);
//         }
//       }
//     }

//     loadSession();

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (!isMounted) return;
//       setSession(session);
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     return () => {
//       isMounted = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   const signOut = async () => {
//     setLoading(true);
//     try {
//       await supabase.auth.signOut();
//     } catch (error) {
//       console.error("Error signing out:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { user, session, loading, signOut };
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function useSupabaseAuth() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 1. Subscribe FIRST (prevents missed events)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. THEN fetch initial session
    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) {
        console.error(error);
        setSession(null);
        setUser(null);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }

      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    // onAuthStateChange will handle state reset
  };

  return { user, session, loading, signOut };
}