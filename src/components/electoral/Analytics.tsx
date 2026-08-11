import React, { useState } from 'react';
import { BarChart3, PieChart, Map as MapIcon, Plus, Filter } from 'lucide-react';

const SURVEYS = [
  { name: 'Voter Trust Index Q2 2026', responses: 4287, completion: 92, status: 'Active', region: 'National' },
  { name: 'Youth Civic Engagement Pulse', responses: 1832, completion: 67, status: 'Active', region: 'Western Province' },
  { name: 'Electoral Security Perception', responses: 2914, completion: 100, status: 'Closed', region: 'High-Risk Districts' },
  { name: 'Pre-Election Mobilization', responses: 645, completion: 21, status: 'Draft', region: 'Coastal Region' },
];

const DEMOGRAPHIC_BARS = [
  { label: 'Urban', val: 68 },
  { label: 'Suburban', val: 54 },
  { label: 'Rural', val: 41 },
  { label: 'Indigenous', val: 38 },
];

const TREND = [42, 48, 51, 47, 55, 62, 58, 65, 71, 68, 74, 79];

const HEATMAP = Array.from({ length: 56 }, (_, i) => ({
  intensity: Math.random(),
  id: i,
}));

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'demographics' | 'geographic'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-amber-700 mb-1">Survey & Analytics Hub</p>
          <h1 className="text-3xl font-bold text-slate-900">Data-Driven Electoral Insights</h1>
          <p className="text-slate-600 mt-1">Build surveys, weight by demographics, and visualize electoral trends.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-medium">
            <Filter size={16} /> Filters
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium">
            <Plus size={16} /> New Survey
          </button>
        </div>
      </div>

      {/* Survey list */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h3 className="font-bold text-slate-900">Active Surveys</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {SURVEYS.map((s) => (
            <div key={s.name} className="p-5 hover:bg-slate-50 transition flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-500">{s.region}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{s.responses.toLocaleString()}</p>
                <p className="text-xs text-slate-500">responses</p>
              </div>
              <div className="w-32">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-700">{s.completion}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${s.completion}%` }} />
                </div>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  s.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : s.status === 'Closed'
                    ? 'bg-slate-200 text-slate-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          {[
            { k: 'overview', l: 'Trend Analysis', i: BarChart3 },
            { k: 'demographics', l: 'Demographics', i: PieChart },
            { k: 'geographic', l: 'Geographic Heatmap', i: MapIcon },
          ].map((t) => {
            const Icon = t.i;
            const active = activeTab === t.k;
            return (
              <button
                key={t.k}
                onClick={() => setActiveTab(t.k as 'overview' | 'demographics' | 'geographic')}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition ${
                  active ? 'border-amber-600 text-amber-700' : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={16} />
                {t.l}
              </button>
            );
          })}
        </div>

        {activeTab === 'overview' && (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Voter Trust in Electoral Institutions — 12 Month Trend</p>
            <div className="flex items-end gap-2 h-48">
              {TREND.map((v, i) => (
                <div key={i} className="flex-1 group relative">
                  <div
                    className="bg-gradient-to-t from-amber-500 to-amber-300 rounded-t hover:from-amber-600 transition cursor-pointer"
                    style={{ height: `${v}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {v}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'demographics' && (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-4">Civic Engagement by Demographic Strata (Weighted)</p>
            <div className="space-y-4">
              {DEMOGRAPHIC_BARS.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{d.label}</span>
                    <span className="font-bold text-slate-900">{d.val}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${d.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'geographic' && (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Electoral Risk Heatmap — District Level</p>
            <div className="grid grid-cols-8 gap-1.5">
              {HEATMAP.map((h) => {
                const opacity = 0.15 + h.intensity * 0.85;
                const color = h.intensity > 0.7 ? '239,68,68' : h.intensity > 0.4 ? '245,158,11' : '16,185,129';
                return (
                  <div
                    key={h.id}
                    className="aspect-square rounded hover:scale-110 transition cursor-pointer"
                    style={{ backgroundColor: `rgba(${color},${opacity})` }}
                    title={`Risk score: ${(h.intensity * 100).toFixed(0)}`}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded" /> Low Risk</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-amber-500 rounded" /> Medium Risk</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-500 rounded" /> High Risk</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
