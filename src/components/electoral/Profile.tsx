import React, { useState, useEffect } from 'react';
import { useAuth, ROLE_LABELS, UserRole } from '@/contexts/AuthContext';
import { User as UserIcon, Building2, Globe, Bell, Shield, Save, LogOut, Loader2, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const Profile: React.FC = () => {
  const { profile, user, updateProfile, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<UserRole>('analyst');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyAlerts, setNotifyAlerts] = useState(true);
  const [notifyWeekly, setNotifyWeekly] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [counts, setCounts] = useState({ assessments: 0, surveys: 0, drafts: 0 });

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
      setOrganization(profile.organization ?? '');
      setCountry(profile.country ?? '');
      setRole(profile.role);
      setNotifyEmail(profile.notify_email);
      setNotifyAlerts(profile.notify_alerts);
      setNotifyWeekly(profile.notify_weekly);
    }
  }, [profile]);

  useEffect(() => {
    const loadCounts = async () => {
      if (!user) return;
      const [a, s, d] = await Promise.all([
        supabase.from('assessments').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('surveys').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('policy_drafts').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ]);
      setCounts({
        assessments: a.count ?? 0,
        surveys: s.count ?? 0,
        drafts: d.count ?? 0,
      });
    };
    loadCounts();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    const { error } = await updateProfile({
      full_name: fullName,
      organization,
      country,
      role,
      notify_email: notifyEmail,
      notify_alerts: notifyAlerts,
      notify_weekly: notifyWeekly,
    });
    if (error) setError(error);
    else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-blue-700" />
      </div>
    );
  }

  const initials = (fullName || profile.email)
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-700 mb-1">My Profile</p>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-600 mt-1">Manage your identity, role, and notification preferences.</p>
      </div>

      {/* Identity card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white flex flex-wrap items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        <div className="flex-1 min-w-[200px]">
          <p className="text-xl font-bold">{fullName || 'Anonymous User'}</p>
          <p className="text-sm text-blue-100">{profile.email}</p>
          <span className="inline-block mt-1.5 text-xs bg-white/15 px-2.5 py-1 rounded-full font-semibold">
            {ROLE_LABELS[role]}
          </span>
        </div>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Assessments', val: counts.assessments, color: 'bg-blue-50 text-blue-700' },
          { label: 'Surveys', val: counts.surveys, color: 'bg-amber-50 text-amber-700' },
          { label: 'Policy Drafts', val: counts.drafts, color: 'bg-purple-50 text-purple-700' },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-xl p-4 border border-slate-200/60`}>
            <p className="text-2xl font-bold">{s.val}</p>
            <p className="text-xs font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-2 gap-6">
        {/* Personal info */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <UserIcon size={18} className="text-blue-700" />
            <h3 className="font-bold text-slate-900">Personal Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                placeholder="Dr. Maria Reyes"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Organization</label>
              <div className="relative mt-1">
                <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  type="text"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="Electoral Commission / University"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Country</label>
              <div className="relative mt-1">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                  placeholder="Philippines"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                disabled={profile.role !== 'admin'}
                className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm bg-white disabled:bg-slate-50"
              >
                {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
              {profile.role !== 'admin' && (
                <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1">
                  <Shield size={11} />
                  Role changes require administrator approval.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={18} className="text-amber-600" />
              <h3 className="font-bold text-slate-900">Notification Preferences</h3>
            </div>

            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Notifications', desc: 'Receive platform updates via email', val: notifyEmail, set: setNotifyEmail },
                { key: 'alerts', label: 'Risk & Security Alerts', desc: 'Critical electoral risk notifications', val: notifyAlerts, set: setNotifyAlerts },
                { key: 'weekly', label: 'Weekly Digest', desc: 'Summary of trends and new resources', val: notifyWeekly, set: setNotifyWeekly },
              ].map((n) => (
                <label
                  key={n.key}
                  className="flex items-start justify-between gap-3 p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{n.label}</p>
                    <p className="text-xs text-slate-600">{n.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => n.set(!n.val)}
                    className={`relative inline-flex w-10 h-6 rounded-full transition shrink-0 ${
                      n.val ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-5 h-5 bg-white rounded-full transition transform ${
                        n.val ? 'translate-x-[18px]' : 'translate-x-0.5'
                      } mt-0.5`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
            {saved ? 'Saved Successfully' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
