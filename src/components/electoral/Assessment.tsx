import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronRight, Download, FileText, AlertCircle, Save, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const PHASES = [
  {
    id: 1,
    name: 'Context Analysis',
    desc: 'Map the political, social, and historical landscape of the geopolitical unit.',
    items: ['Political history review', 'Stakeholder mapping', 'Constitutional framework', 'Conflict drivers analysis'],
  },
  {
    id: 2,
    name: 'Needs Assessment',
    desc: 'Identify gaps in voter education, security, infrastructure, and institutional capacity.',
    items: ['Voter education gap analysis', 'Security vulnerability scan', 'Infrastructure audit', 'Capacity diagnostic'],
  },
  {
    id: 3,
    name: 'Objective Definition',
    desc: 'Define SMART objectives aligned with EAF categories and democratic resilience goals.',
    items: ['Strategic objectives', 'Measurable indicators', 'Timeline definition', 'Success criteria'],
  },
  {
    id: 4,
    name: 'Program Options',
    desc: 'Identify evidence-based program options drawn from the EAF Toolkit and USAID best practices.',
    items: ['Civic education campaigns', 'Security coordination', 'BRIDGE training', 'Voter registration drives'],
  },
  {
    id: 5,
    name: 'Implementation Planning',
    desc: 'Develop actionable workplans with stakeholder roles, budgets, and risk mitigation.',
    items: ['Workplan & timeline', 'Budget allocation', 'Stakeholder roles', 'Risk mitigation matrix'],
  },
  {
    id: 6,
    name: 'Monitoring & Evaluation',
    desc: 'Track program effectiveness with indicators and adapt based on real-time data.',
    items: ['M&E framework', 'KPI dashboard', 'Field reports', 'Impact assessment'],
  },
];

const Assessment: React.FC = () => {
  const { user } = useAuth();
  const [activePhase, setActivePhase] = useState(2);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [title, setTitle] = useState('Western Province — 2026 General Election');
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load latest assessment for user
  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setAssessmentId(data.id);
        setTitle(data.title);
        setCompleted((data.data?.completed as Record<string, boolean>) ?? {});
        setActivePhase(data.phase ?? 2);
      } else {
        // seed
        setCompleted({
          '1-Political history review': true,
          '1-Stakeholder mapping': true,
          '1-Constitutional framework': true,
          '1-Conflict drivers analysis': true,
          '2-Voter education gap analysis': true,
          '2-Security vulnerability scan': true,
        });
      }
      setLoading(false);
    };
    load();
  }, [user]);

  const toggle = (key: string) => setCompleted((c) => ({ ...c, [key]: !c[key] }));

  const phaseProgress = (phaseId: number) => {
    const phase = PHASES.find((p) => p.id === phaseId)!;
    const done = phase.items.filter((i) => completed[`${phaseId}-${i}`]).length;
    return Math.round((done / phase.items.length) * 100);
  };

  const overall = Math.round(PHASES.reduce((sum, p) => sum + phaseProgress(p.id), 0) / PHASES.length);

  const current = PHASES.find((p) => p.id === activePhase)!;

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const payload = {
      user_id: user.id,
      title,
      region: title,
      phase: activePhase,
      progress: overall,
      data: { completed },
      updated_at: new Date().toISOString(),
    };
    if (assessmentId) {
      await supabase.from('assessments').update(payload).eq('id', assessmentId);
    } else {
      const { data } = await supabase.from('assessments').insert(payload).select().maybeSingle();
      if (data) setAssessmentId(data.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={28} className="animate-spin text-blue-700" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex-1 min-w-[280px]">
          <p className="text-sm font-medium text-blue-700 mb-1">Electoral Assessment Framework</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-bold text-slate-900 w-full bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-400 focus:outline-none transition"
          />
          <p className="text-slate-600 mt-1">Structured 6-phase assessment with guided templates and checklists.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-medium">
            <FileText size={16} /> Templates
          </button>
          {user && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? 'Saved' : saving ? 'Saving...' : 'Save'}
            </button>
          )}
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white hover:bg-blue-800 rounded-lg text-sm font-medium">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-blue-200 text-sm">Overall Assessment Progress</p>
            <p className="text-3xl font-bold">{overall}% Complete</p>
          </div>
          <div className="text-right">
            <p className="text-blue-200 text-sm">{assessmentId ? 'Saved to your account' : 'Local draft'}</p>
            <p className="font-semibold text-sm">{user ? user.email : 'Sign in to save'}</p>
          </div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-blue-300 rounded-full transition-all duration-500"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wider mb-3">EAF Phases</h3>
          {PHASES.map((p) => {
            const prog = phaseProgress(p.id);
            const active = activePhase === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePhase(p.id)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  active ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        prog === 100 ? 'bg-emerald-500 text-white' : active ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {prog === 100 ? <CheckCircle2 size={14} /> : p.id}
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">{p.name}</span>
                  </div>
                  <ChevronRight size={16} className={`${active ? 'text-blue-700' : 'text-slate-400'}`} />
                </div>
                <div className="ml-9 mt-2">
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${prog}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{prog}% complete</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Phase {current.id} of 6</p>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{current.name}</h2>
              <p className="text-slate-600 mt-1">{current.desc}</p>
            </div>
            <span className="text-2xl font-bold text-slate-900">{phaseProgress(current.id)}%</span>
          </div>

          <div className="space-y-2 mb-6">
            <h4 className="text-sm font-semibold text-slate-700">Checklist</h4>
            {current.items.map((item) => {
              const key = `${current.id}-${item}`;
              const done = completed[key];
              return (
                <button
                  key={item}
                  onClick={() => toggle(key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition text-left ${
                    done ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  {done ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <Circle size={18} className="text-slate-400 shrink-0" />}
                  <span className={`text-sm ${done ? 'text-slate-700 line-through' : 'text-slate-800 font-medium'}`}>{item}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-900">Toolkit Guidance</p>
              <p className="text-sm text-amber-800 mt-1">
                Reference Section {current.id}.2 of the EAF Toolkit for detailed methodology, sample questions, and stakeholder interview templates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
