import React from 'react';
import {
  ClipboardCheck,
  Target,
  BarChart3,
  FileText,
  GraduationCap,
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { ViewKey } from './Sidebar';

interface DashboardProps {
  onNavigate: (v: ViewKey) => void;
}

const MODULES: {
  key: ViewKey;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  border: string;
  iconBg: string;
  stat: string;
  statLabel: string;
}[] = [
  {
    key: 'assessment',
    title: 'EAF Assessment',
    desc: 'Conduct structured electoral assessments across the 6-phase framework with guided templates and checklists.',
    icon: ClipboardCheck,
    accent: 'from-blue-50 to-blue-100/50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-900',
    stat: '40+',
    statLabel: 'Templates',
  },
  {
    key: 'planning',
    title: 'Strategic Planning',
    desc: 'Model campaign scenarios, simulate tactics, and run comparative analysis across geopolitical units.',
    icon: Target,
    accent: 'from-emerald-50 to-emerald-100/50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-700',
    stat: '12',
    statLabel: 'Variables',
  },
  {
    key: 'analytics',
    title: 'Survey & Analytics',
    desc: 'Build surveys, collect field data, weight by demographics, and visualize trends with heatmaps.',
    icon: BarChart3,
    accent: 'from-amber-50 to-amber-100/50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-600',
    stat: '15+',
    statLabel: 'Question Types',
  },
  {
    key: 'policy',
    title: 'Policy Studio',
    desc: 'Collaborative policy formulation with evidence library, citations, and one-click brief generation.',
    icon: FileText,
    accent: 'from-purple-50 to-purple-100/50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-700',
    stat: '25+',
    statLabel: 'Templates',
  },
  {
    key: 'academy',
    title: 'Capacity Academy',
    desc: '12 structured learning modules with multimedia toolkits and competency assessments.',
    icon: GraduationCap,
    accent: 'from-emerald-50 to-emerald-100/50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-700',
    stat: '12',
    statLabel: 'Modules',
  },
  {
    key: 'collaboration',
    title: 'Workspaces',
    desc: 'Multi-user collaboration with secure channels, version control, and stakeholder commenting.',
    icon: Users,
    accent: 'from-purple-50 to-purple-100/50',
    border: 'border-purple-200',
    iconBg: 'bg-purple-700',
    stat: '∞',
    statLabel: 'Collaborators',
  },
  {
    key: 'security',
    title: 'Security & Ethics',
    desc: 'Built-in safeguards for data privacy, electoral integrity, and compliance with democratic standards.',
    icon: Shield,
    accent: 'from-amber-50 to-amber-100/50',
    border: 'border-amber-200',
    iconBg: 'bg-amber-600',
    stat: 'ISO',
    statLabel: 'Compliant',
  },
];

const RECENT_ACTIVITY = [
  { icon: CheckCircle2, color: 'text-emerald-600', text: 'Phase 3 Objectives finalized for Western Province', time: '12 min ago' },
  { icon: AlertTriangle, color: 'text-amber-600', text: 'Risk threshold exceeded in District 4 — voter intimidation reports', time: '1 hr ago' },
  { icon: TrendingUp, color: 'text-blue-600', text: 'Survey "Voter Trust Index Q2" completed with 4,287 responses', time: '3 hrs ago' },
  { icon: Clock, color: 'text-purple-600', text: 'Policy brief "Civic Education Reform" awaiting review', time: '5 hrs ago' },
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* KPI strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Assessments', val: '23', delta: '+4', color: 'text-blue-700', bg: 'bg-blue-50' },
          { label: 'Programs in Progress', val: '47', delta: '+12', color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'High-Risk Regions', val: '8', delta: '-2', color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Policy Briefs Drafted', val: '156', delta: '+18', color: 'text-purple-700', bg: 'bg-purple-50' },
        ].map((k) => (
          <div key={k.label} className={`${k.bg} rounded-xl p-5 border border-slate-200/60`}>
            <p className="text-xs font-medium text-slate-600 mb-1">{k.label}</p>
            <div className="flex items-end justify-between">
              <p className={`text-3xl font-bold ${k.color}`}>{k.val}</p>
              <span className={`text-xs font-semibold ${k.delta.startsWith('-') ? 'text-red-600' : 'text-emerald-600'}`}>
                {k.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modules grid */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Platform Modules</h2>
            <p className="text-sm text-slate-600">Integrated tools aligned with the Electoral Assessment Framework</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                onClick={() => onNavigate(m.key)}
                className={`group text-left bg-gradient-to-br ${m.accent} ${m.border} border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${m.iconBg} text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm`}>
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight size={18} className="text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">{m.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{m.desc}</p>
                <div className="flex items-baseline gap-2 pt-3 border-t border-slate-200/60">
                  <span className="text-2xl font-bold text-slate-900">{m.stat}</span>
                  <span className="text-xs text-slate-600">{m.statLabel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {RECENT_ACTIVITY.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-lg transition">
                  <Icon size={18} className={`${a.color} mt-0.5 shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800">{a.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-6">
          <Shield size={24} className="text-emerald-300 mb-3" />
          <h3 className="font-bold mb-2">Compliance Status</h3>
          <p className="text-sm text-blue-100 mb-4">
            All workspaces operating in compliance with international democratic standards and data protection protocols.
          </p>
          <div className="space-y-2 text-sm">
            {['GDPR Data Privacy', 'USAID Best Practices', 'Election Integrity Protocols'].map((c) => (
              <div key={c} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-300" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
