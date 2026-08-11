import React from 'react';
import { Shield, Lock, FileCheck, AlertTriangle, CheckCircle2, Eye } from 'lucide-react';

const PRINCIPLES = [
  { icon: Lock, title: 'Data Privacy by Design', desc: 'GDPR-aligned anonymization and encryption protocols across all survey and assessment data.' },
  { icon: FileCheck, title: 'Electoral Integrity', desc: 'Immutable audit trails and verification chains protect strategic plans and policy drafts.' },
  { icon: Eye, title: 'Transparent Methodology', desc: 'All recommendations cite EAF and USAID source materials for full traceability.' },
  { icon: Shield, title: 'Ethical AI Use', desc: 'Bias-tested models, human-in-the-loop review for sensitive electoral predictions.' },
];

const COMPLIANCE = [
  { name: 'GDPR (EU Data Protection)', status: 'Certified' },
  { name: 'USAID Electoral Security Best Practices', status: 'Aligned' },
  { name: 'IDEA International Election Standards', status: 'Aligned' },
  { name: 'ISO 27001 Information Security', status: 'Certified' },
  { name: 'Open Election Data Initiative', status: 'Compliant' },
];

const RISKS = [
  { region: 'District 4', type: 'Voter Intimidation', level: 'High', count: 7 },
  { region: 'Western Province', type: 'Disinformation', level: 'Medium', count: 23 },
  { region: 'Coastal Region', type: 'Infrastructure Tampering', level: 'Low', count: 2 },
];

const Security: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-amber-700 mb-1">Security & Ethics</p>
        <h1 className="text-3xl font-bold text-slate-900">Safeguards for Democratic Integrity</h1>
        <p className="text-slate-600 mt-1">Built-in protections aligned with international democratic standards.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {PRINCIPLES.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="bg-white border border-slate-200 rounded-2xl p-6 flex gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Compliance & Standards</h3>
          <div className="space-y-3">
            {COMPLIANCE.map((c) => (
              <div key={c.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-800">{c.name}</span>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full font-semibold">
                  <CheckCircle2 size={12} />
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">Active Risk Alerts</h3>
            <span className="text-xs text-slate-500">Live · Updated 14s ago</span>
          </div>
          <div className="space-y-2">
            {RISKS.map((r) => (
              <div key={r.region + r.type} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                <AlertTriangle
                  size={18}
                  className={
                    r.level === 'High' ? 'text-red-600' : r.level === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                  }
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{r.type}</p>
                  <p className="text-xs text-slate-500">{r.region} · {r.count} reports</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    r.level === 'High'
                      ? 'bg-red-100 text-red-700'
                      : r.level === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {r.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
