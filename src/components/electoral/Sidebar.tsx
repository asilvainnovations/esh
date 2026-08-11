import React from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  Target,
  BarChart3,
  FileText,
  GraduationCap,
  Shield,
  Users,
  Globe,
  UserCircle,
  Lock,
} from 'lucide-react';
import { useAuth, ROLE_ACCESS, ROLE_LABELS } from '@/contexts/AuthContext';

export type ViewKey =
  | 'dashboard'
  | 'assessment'
  | 'planning'
  | 'analytics'
  | 'policy'
  | 'academy'
  | 'collaboration'
  | 'security'
  | 'profile';

interface SidebarProps {
  current: ViewKey;
  onChange: (v: ViewKey) => void;
  onRequireSignIn: () => void;
}

const NAV: { key: ViewKey; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'assessment', label: 'EAF Assessment', icon: ClipboardCheck },
  { key: 'planning', label: 'Strategic Planning', icon: Target },
  { key: 'analytics', label: 'Survey & Analytics', icon: BarChart3 },
  { key: 'policy', label: 'Policy Studio', icon: FileText },
  { key: 'academy', label: 'Capacity Academy', icon: GraduationCap },
  { key: 'collaboration', label: 'Workspaces', icon: Users },
  { key: 'security', label: 'Security & Ethics', icon: Shield },
];

const Sidebar: React.FC<SidebarProps> = ({ current, onChange, onRequireSignIn }) => {
  const { profile } = useAuth();
  const allowed = profile ? ROLE_ACCESS[profile.role] : [];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 sticky top-16 h-[calc(100vh-4rem)] shrink-0">
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Workspace</p>
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = current === item.key;
          // Dashboard always accessible. Other modules: locked if user signed in but role doesn't allow
          const locked = profile ? !allowed.includes(item.key) : false;
          return (
            <button
              key={item.key}
              onClick={() => {
                if (!profile && item.key !== 'dashboard') {
                  onRequireSignIn();
                  return;
                }
                if (locked) return;
                onChange(item.key);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                active
                  ? 'bg-blue-50 text-blue-900 border border-blue-100'
                  : locked
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1 text-left">{item.label}</span>
              {locked && <Lock size={12} />}
            </button>
          );
        })}

        {profile && (
          <>
            <div className="pt-4 mt-2 border-t border-slate-100" />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">Account</p>
            <button
              onClick={() => onChange('profile')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                current === 'profile'
                  ? 'bg-blue-50 text-blue-900 border border-blue-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <UserCircle size={18} />
              <span>Profile & Settings</span>
            </button>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-slate-200">
        {profile ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-emerald-900">Signed in as</p>
            <p className="text-xs text-emerald-700 mt-0.5">{ROLE_LABELS[profile.role]}</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-4 text-white">
            <Globe size={20} className="mb-2" />
            <p className="text-sm font-semibold mb-1">Sign in required</p>
            <p className="text-xs text-blue-100 mb-3">Create an account to access full platform features.</p>
            <button
              onClick={onRequireSignIn}
              className="text-xs font-medium bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-md w-full transition"
            >
              Sign In / Sign Up
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
