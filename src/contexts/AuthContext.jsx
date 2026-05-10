import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { mockUser } from "../data/mockData";

const AuthContext = createContext(null);
const DEMO_KEY = "agrivision-demo-user";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      const stored = window.localStorage.getItem(DEMO_KEY);
      const parsedUser = stored ? JSON.parse(stored) : mockUser;
      setUser(parsedUser);
      setProfile({ full_name: parsedUser.name, email: parsedUser.email });
      setLoading(false);
      return undefined;
    }

    const boot = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    };

    boot();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase || !user) return;

    const loadProfile = async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) setProfile(data);
    };

    loadProfile();
  }, [user]);

  const register = async ({ fullName, email, password }) => {
    if (!isSupabaseConfigured || !supabase) {
      const demo = { id: "demo-user", name: fullName, email, password };
      window.localStorage.setItem(DEMO_KEY, JSON.stringify(demo));
      setUser(demo);
      setProfile({ full_name: fullName, email });
      return { error: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { error };
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName,
        email,
      });
    }
    return { error: null };
  };

  const login = async ({ email, password }) => {
    if (!isSupabaseConfigured || !supabase) {
      const demo = { id: "demo-user", name: "AgriVision Demo User", email, password };
      window.localStorage.setItem(DEMO_KEY, JSON.stringify(demo));
      setUser(demo);
      setProfile({ full_name: demo.name, email });
      return { error: null };
    }
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    if (!isSupabaseConfigured || !supabase) {
      window.localStorage.removeItem(DEMO_KEY);
      setUser(mockUser);
      setProfile({ full_name: mockUser.name, email: mockUser.email });
      return;
    }
    await supabase.auth.signOut();
  };

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      isConfigured: isSupabaseConfigured,
      register,
      login,
      logout,
    }),
    [session, user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
