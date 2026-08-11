import React from 'react';
import { Users, Lock, MessageCircle, Folder, Globe } from 'lucide-react';

const WORKSPACES = [
  { name: 'Western Province 2026 Assessment', members: 12, updated: '2 min ago', type: 'EAF Project', secure: true },
  { name: 'National Civic Education Coalition', members: 28, updated: '1 hr ago', type: 'Program', secure: true },
  { name: 'Electoral Security Working Group', members: 7, updated: '3 hrs ago', type: 'Security', secure: true },
  { name: 'Youth Engagement Research Pod', members: 15, updated: 'Yesterday', type: 'Research', secure: false },
];

const Collaboration: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-purple-700 mb-1">Collaboration & Sharing</p>
        <h1 className="text-3xl font-bold text-slate-900">Multi-User Workspaces</h1>
        <p className="text-slate-600 mt-1">Secure communication channels for stakeholders working across geopolitical units.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {WORKSPACES.map((w) => (
            <div key={w.name} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-purple-300 transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center">
                    <Folder size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-slate-900">{w.name}</p>
                      {w.secure && <Lock size={12} className="text-emerald-600" />}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{w.type} · Updated {w.updated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Users size={14} />
                  <span className="font-semibold">{w.members}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <button className="px-3 py-1.5 text-xs font-medium bg-purple-700 text-white hover:bg-purple-800 rounded-lg">Open Workspace</button>
                <button className="px-3 py-1.5 text-xs font-medium border border-slate-300 hover:bg-slate-50 rounded-lg flex items-center gap-1">
                  <MessageCircle size={12} /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-2xl p-6">
            <Globe size={24} className="mb-3" />
            <h3 className="font-bold mb-2">Secure Channels</h3>
            <p className="text-sm text-purple-100 mb-4">End-to-end encrypted communication for sensitive electoral coordination.</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Lock size={14} className="text-emerald-300" /> AES-256 encryption</li>
              <li className="flex items-center gap-2"><Lock size={14} className="text-emerald-300" /> Role-based access</li>
              <li className="flex items-center gap-2"><Lock size={14} className="text-emerald-300" /> Audit logs</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {['Create new workspace', 'Invite stakeholder', 'Export workspace report', 'Schedule briefing'].map((a) => (
                <button key={a} className="w-full text-left text-sm py-2 px-3 hover:bg-slate-50 rounded-lg text-slate-700">
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
