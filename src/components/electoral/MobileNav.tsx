import React from 'react';
import { ViewKey } from './Sidebar';
import {
  LayoutDashboard,
  ClipboardCheck,
  Target,
  BarChart3,
  FileText,
  GraduationCap,
  Users,
  Shield,
} from 'lucide-react';

interface Props {
  current: ViewKey;
  onChange: (v: ViewKey) => void;
}

const ITEMS: { key: ViewKey; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'assessment', label: 'EAF Assessment', icon: ClipboardCheck },
  { key: 'planning', label: 'Strategic Planning', icon: Target },
  { key: 'analytics', label: 'Survey & Analytics', icon: BarChart3 },
  { key: 'policy', label: 'Policy Studio', icon: FileText },
  { key: 'academy', label: 'Capacity Academy', icon: GraduationCap },
  { key: 'collaboration', label: 'Workspaces', icon: Users },
  { key: 'security', label: 'Security & Ethics', icon: Shield },
];

const MobileNav: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="lg:hidden bg-white border-b border-slate-200 sticky top-16 z-30 overflow-x-auto">
      <div className="flex gap-1 px-4 py-2 min-w-max">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          const active = current === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                active ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={14} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
