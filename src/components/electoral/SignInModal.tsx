import React, { useState } from 'react';
import { X, Mail, Lock, Vote, Loader2, User as UserIcon, Building2, Globe } from 'lucide-react';
import { useAuth, UserRole, ROLE_LABELS } from '@/contexts/AuthContext';

interface Props {
  open: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<Props> = ({ open, onClose }) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState<UserRole>('analyst');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const reset = () => {
    setEmail('');
    setPassword('');
    setName('');
    setOrganization('');
    setCountry('');
    setRole('analyst');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error);
          return;
        }
      } else {
        const { error } = await signUp(email, password, {
          full_name: name,
          organization,
          country,
          role,
        });
        if (error) {
          setError(error);
          return;
        }
      }
      reset();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close">
            <X size={20} />
          </button>
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-3">
            <Vote size={22} />
          </div>
          <h2 className="text-2xl font-bold">{mode === 'signin' ? 'Welcome back' : 'Join the EAF Platform'}</h2>
          <p className="text-sm text-blue-100 mt-1">
            {mode === 'signin' ? 'Continue your electoral assessment work.' : 'Get started with evidence-based democratic strategy.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3">
          {mode === 'signup' && (
            <>
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</label>
                <div className="relative mt-1">
                  <UserIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                    placeholder="Dr. Maria Reyes"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Organization</label>
                  <div className="relative mt-1">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      type="text"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                      placeholder="Univ. / EMB"
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
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="mt-1 w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm bg-white"
                >
                  {(Object.keys(ROLE_LABELS) as UserRole[])
                    .filter((r) => r !== 'admin')
                    .map((r) => (
                      <option key={r} value={r}>
                        {ROLE_LABELS[r]}
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Email</label>
            <div className="relative mt-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                placeholder="you@institution.org"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Password</label>
            <div className="relative mt-1">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition mt-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-slate-600">
            {mode === 'signin' ? "Don't have an account? " : 'Already a member? '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signin' ? 'signup' : 'signin');
                setError(null);
              }}
              className="text-blue-700 font-semibold hover:underline"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
