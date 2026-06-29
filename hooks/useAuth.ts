
import supabse from "@/lib/supabase/supabse";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    supabse.auth
      .getUser()
      .then(({ data }) => {
        if (!isMounted) return;
        setUser(data?.user ?? null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const { data: listener } = supabse.auth.onAuthStateChange((_, session) => {
      if (!isMounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};