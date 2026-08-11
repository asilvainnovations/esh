import React, { useState, useEffect } from 'react';
import { FileText, BookOpen, MessageSquare, Download, Tag, Users, Save, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const TEMPLATES = [
  { name: 'Civic Education Policy Brief', category: 'Voter Education', uses: 124 },
  { name: 'Electoral Security Coordination Plan', category: 'Security', uses: 89 },
  { name: 'Capacity-Building Program Charter', category: 'Capacity', uses: 156 },
  { name: 'Risk Mitigation Framework', category: 'Risk', uses: 73 },
  { name: 'Stakeholder Engagement Strategy', category: 'Collaboration', uses: 102 },
  { name: 'Disinformation Response Protocol', category: 'Integrity', uses: 67 },
];

const EVIDENCE = [
  { title: 'USAID Electoral Security Best Practices', tag: 'USAID', year: 2013 },
  { title: 'EAF Toolkit — Program Options Catalogue', tag: 'EAF', year: 2024 },
  { title: 'BRIDGE Methodology in Post-Conflict Settings', tag: 'Capacity', year: 2022 },
  { title: 'Comparative Study: Voter Turnout Interventions', tag: 'Research', year: 2023 },
];

const DEFAULT_DRAFT = `# Civic Education Reform — Western Province\n\n## Executive Summary\nFollowing the EAF Phase 2 Needs Assessment, gaps in voter education have been identified across...\n\n## Recommended Interventions\n1. Community dialogue series (12 sessions)\n2. Multilingual voter education materials\n3. Mobile civic learning units for rural districts`;

const Policy: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('Civic Education Reform');
  const [draft, setDraft] = useState(DEFAULT_DRAFT);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('policy_drafts')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data) {
        setDraftId(data.id);
        setTitle(data.title);
        setDraft(data.content || DEFAULT_DRAFT);
      }
    };
    load();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const payload = {
      user_id: user.id,
      title,
      category: 'Voter Education',
      content: draft,
      version: 'v3.2',
      updated_at: new Date().toISOString(),
    };
    if (draftId) {
      await supabase.from('policy_drafts').update(payload).eq('id', draftId);
    } else {
      const { data } = await supabase.from('policy_drafts').insert(payload).select().maybeSingle();
      if (data) setDraftId(data.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-purple-700 mb-1">Policy Formulation Studio</p>
          <h1 className="text-3xl font-bold text-slate-900">Collaborative Policy & Brief Drafting</h1>
          <p className="text-slate-600 mt-1">Evidence-based templates, citation manager, and one-click brief generation.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-medium">
            <Users size={16} /> Share
          </button>
          {user && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <Check size={16} /> : <Save size={16} />}
              {saved ? 'Saved' : saving ? 'Saving...' : 'Save Draft'}
            </button>
          )}
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-sm font-medium">
            <Download size={16} /> Generate Brief
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-2 flex-1">
              <FileText size={18} className="text-purple-700 shrink-0" />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-semibold text-slate-900 bg-transparent flex-1 focus:outline-none"
              />
              <span className="text-xs text-slate-500">v3.2</span>
            </div>
            <div className="flex -space-x-2">
              {['MR', 'AS', 'KP'].map((i, idx) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${
                    ['bg-blue-600', 'bg-emerald-600', 'bg-amber-600'][idx]
                  }`}
                >
                  {i}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-bold">
                +2
              </div>
            </div>
          </div>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full h-80 p-5 font-mono text-sm text-slate-800 leading-relaxed focus:outline-none resize-none"
          />
          <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
            <span>{draftId ? 'Saved to your account' : 'Local draft'} · {draft.length} characters</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> 3 collaborators online
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-purple-700" />
              <h3 className="font-bold text-slate-900">Policy Templates</h3>
            </div>
            <div className="space-y-2">
              {TEMPLATES.slice(0, 4).map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTitle(t.name)}
                  className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition"
                >
                  <p className="font-medium text-sm text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.category} · {t.uses} uses</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-purple-700" />
              <h3 className="font-bold text-slate-900">Evidence Library</h3>
            </div>
            <div className="space-y-2">
              {EVIDENCE.map((e) => (
                <div key={e.title} className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm font-medium text-slate-900 leading-snug">{e.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded font-medium">{e.tag}</span>
                    <span className="text-xs text-slate-500">{e.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-purple-700" />
              <h3 className="font-bold text-slate-900 text-sm">Stakeholder Comments</h3>
            </div>
            <p className="text-xs text-slate-700">
              "Recommend cross-referencing with the 2024 voter turnout data in District 7." — <span className="font-semibold">Dr. Reyes</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
