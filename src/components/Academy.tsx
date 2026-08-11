import React from 'react';
import { GraduationCap, PlayCircle, FileText, Award, Clock } from 'lucide-react';

const MODULES = [
  { num: 1, title: 'Introduction to the Electoral Assessment Framework', duration: '45 min', progress: 100, type: 'Foundation' },
  { num: 2, title: 'Context Analysis & Stakeholder Mapping', duration: '1h 20m', progress: 100, type: 'Foundation' },
  { num: 3, title: 'Conducting Needs Assessments in the Field', duration: '2h 10m', progress: 78, type: 'Methodology' },
  { num: 4, title: 'SMART Objectives for Electoral Programs', duration: '55 min', progress: 45, type: 'Methodology' },
  { num: 5, title: 'Program Options Catalogue Deep-Dive', duration: '1h 45m', progress: 12, type: 'Programs' },
  { num: 6, title: 'Electoral Security: USAID Best Practices', duration: '2h 30m', progress: 0, type: 'Security' },
  { num: 7, title: 'Risk Assessment & Violence Prevention', duration: '1h 50m', progress: 0, type: 'Security' },
  { num: 8, title: 'Civic Education Campaign Design', duration: '1h 15m', progress: 0, type: 'Programs' },
  { num: 9, title: 'Survey Design & Data Collection Ethics', duration: '1h 40m', progress: 0, type: 'Data' },
  { num: 10, title: 'Data Visualization for Policymakers', duration: '1h 20m', progress: 0, type: 'Data' },
  { num: 11, title: 'Building Institutional Resilience', duration: '2h 5m', progress: 0, type: 'Capacity' },
  { num: 12, title: 'Capstone: Comprehensive Assessment Project', duration: '4h', progress: 0, type: 'Capstone' },
];

const TYPE_COLORS: Record<string, string> = {
  Foundation: 'bg-blue-100 text-blue-700',
  Methodology: 'bg-emerald-100 text-emerald-700',
  Programs: 'bg-amber-100 text-amber-700',
  Security: 'bg-red-100 text-red-700',
  Data: 'bg-purple-100 text-purple-700',
  Capacity: 'bg-indigo-100 text-indigo-700',
  Capstone: 'bg-slate-900 text-white',
};

const Academy: React.FC = () => {
  const completed = MODULES.filter((m) => m.progress === 100).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-700 mb-1">Capacity Building Academy</p>
        <h1 className="text-3xl font-bold text-slate-900">Structured Learning Pathway</h1>
        <p className="text-slate-600 mt-1">12 modules aligned with EAF phases — for election officers, political scientists, and policymakers.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl p-5">
          <Award size={24} className="mb-2" />
          <p className="text-3xl font-bold">{completed}/12</p>
          <p className="text-sm text-emerald-100">Modules Completed</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <Clock size={24} className="text-blue-600 mb-2" />
          <p className="text-3xl font-bold text-slate-900">12.4h</p>
          <p className="text-sm text-slate-600">Learning Time</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <GraduationCap size={24} className="text-purple-600 mb-2" />
          <p className="text-3xl font-bold text-slate-900">82</p>
          <p className="text-sm text-slate-600">Capacity Score</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MODULES.map((m) => {
          const locked = m.progress === 0 && m.num > 5;
          return (
            <div
              key={m.num}
              className={`bg-white border rounded-2xl p-5 transition ${
                locked ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded font-semibold ${TYPE_COLORS[m.type]}`}>{m.type}</span>
                <span className="text-xs text-slate-500 font-mono">M{String(m.num).padStart(2, '0')}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 leading-snug">{m.title}</h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Clock size={12} /> {m.duration}</span>
                <span className="flex items-center gap-1"><FileText size={12} /> Toolkit + Quiz</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full ${m.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                  style={{ width: `${m.progress}%` }}
                />
              </div>
              <button
                disabled={locked}
                className={`w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition ${
                  m.progress === 100
                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    : locked
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-900 text-white hover:bg-blue-800'
                }`}
              >
                <PlayCircle size={14} />
                {m.progress === 100 ? 'Review' : m.progress > 0 ? 'Continue' : locked ? 'Locked' : 'Start Module'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Academy;
