import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export type UserRole = 'analyst' | 'officer' | 'policymaker' | 'admin';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  organization: string | null;
  country: string | null;
  role: UserRole;
  notify_email: boolean;
  notify_alerts: boolean;
  notify_weekly: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    meta: { full_name?: string; organization?: string; country?: string; role?: UserRole }
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: string | null }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (uid: string) => {
    const { data } = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle();
    if (data) setProfile(data as Profile);
    return data as Profile | null;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id);
  }, [user, loadProfile]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) await loadProfile(session.user.id);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        await loadProfile(sess.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUp: AuthContextValue['signUp'] = async (email, password, meta) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: meta },
    });
    if (error) return { error: error.message };

    const newUser = data.user;
    if (newUser) {
      // Create profile row
      await supabase.from('profiles').insert({
        id: newUser.id,
        email,
        full_name: meta.full_name ?? null,
        organization: meta.organization ?? null,
        country: meta.country ?? null,
        role: meta.role ?? 'analyst',
      });
      await loadProfile(newUser.id);

      // CRM subscribe
      try {
        await fetch('https://famous.ai/api/crm/69f321591e9e21f837637be4/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: meta.full_name || undefined,
            source: 'platform-signup',
            tags: ['eaf-platform', 'signup', meta.role ?? 'analyst'],
          }),
        });
      } catch {
        // ignore
      }
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const updateProfile: AuthContextValue['updateProfile'] = async (updates) => {
    if (!user) return { error: 'Not signed in' };
    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    if (error) return { error: error.message };
    await loadProfile(user.id);
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{ user, session, profile, loading, signIn, signUp, signOut, updateProfile, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Role-based access matrix
export const ROLE_ACCESS: Record<UserRole, string[]> = {
  analyst: ['dashboard', 'assessment', 'planning', 'analytics', 'academy', 'security'],
  officer: ['dashboard', 'assessment', 'planning', 'analytics', 'academy', 'collaboration', 'security'],
  policymaker: ['dashboard', 'assessment', 'planning', 'analytics', 'policy', 'academy', 'collaboration', 'security'],
  admin: ['dashboard', 'assessment', 'planning', 'analytics', 'policy', 'academy', 'collaboration', 'security'],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  analyst: 'Political Scientist / Analyst',
  officer: 'Election Officer',
  policymaker: 'Policymaker',
  admin: 'Administrator',
};
