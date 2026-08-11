import React, { useState, useMemo } from 'react';
import { Sliders, Play, GitCompareArrows, MapPin } from 'lucide-react';

const UNITS = [
  { name: 'National', pop: '110M', risk: 'Medium' },
  { name: 'Western Province', pop: '8.2M', risk: 'High' },
  { name: 'Central District', pop: '2.1M', risk: 'Low' },
  { name: 'Coastal Region', pop: '4.5M', risk: 'Medium' },
];

const Planning: React.FC = () => {
  const [turnout, setTurnout] = useState(65);
  const [youthEngagement, setYouthEngagement] = useState(40);
  const [securityIncidents, setSecurityIncidents] = useState(15);
  const [civicEducation, setCivicEducation] = useState(55);
  const [selectedUnits, setSelectedUnits] = useState<string[]>(['Western Province', 'Central District']);

  const outcomes = useMemo(() => {
    const baseLegitimacy = 50;
    const legitimacy = Math.max(0, Math.min(100,
      baseLegitimacy + (turnout - 60) * 0.6 + (civicEducation - 50) * 0.4 - securityIncidents * 1.2 + (youthEngagement - 40) * 0.3
    ));
    const violenceRisk = Math.max(0, Math.min(100, 30 + securityIncidents * 2 - civicEducation * 0.3 - turnout * 0.2));
    const participation = Math.max(0, Math.min(100, turnout + youthEngagement * 0.15 - securityIncidents * 0.5));
    const trust = Math.max(0, Math.min(100, 45 + civicEducation * 0.5 - violenceRisk * 0.4));
    return { legitimacy, violenceRisk, participation, trust };
  }, [turnout, youthEngagement, securityIncidents, civicEducation]);

  const toggleUnit = (n: string) => {
    setSelectedUnits((u) => (u.includes(n) ? u.filter((x) => x !== n) : [...u, n]));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-emerald-700 mb-1">Strategic Planning Workspace</p>
        <h1 className="text-3xl font-bold text-slate-900">Scenario Modeling & Tactical Simulation</h1>
        <p className="text-slate-600 mt-1">Adjust variables to simulate electoral outcomes under different conditions.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Variables */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sliders size={18} className="text-emerald-700" />
            <h3 className="font-bold text-slate-900">Simulation Variables</h3>
          </div>

          {[
            { label: 'Voter Turnout', val: turnout, set: setTurnout, suffix: '%', max: 100, color: 'accent-blue-700' },
            { label: 'Youth Engagement', val: youthEngagement, set: setYouthEngagement, suffix: '%', max: 100, color: 'accent-emerald-700' },
            { label: 'Security Incidents (per 100k)', val: securityIncidents, set: setSecurityIncidents, suffix: '', max: 50, color: 'accent-amber-600' },
            { label: 'Civic Education Coverage', val: civicEducation, set: setCivicEducation, suffix: '%', max: 100, color: 'accent-purple-700' },
          ].map((s) => (
            <div key={s.label} className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">{s.label}</span>
                <span className="text-sm font-bold text-slate-900">{s.val}{s.suffix}</span>
              </div>
              <input
                type="range"
                min={0}
                max={s.max}
                value={s.val}
                onChange={(e) => s.set(Number(e.target.value))}
                className={`w-full ${s.color}`}
              />
            </div>
          ))}

          <button className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition">
            <Play size={16} /> Run Full Simulation
          </button>
        </div>

        {/* Predicted Outcomes */}
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 content-start">
          {[
            { label: 'Electoral Legitimacy', val: outcomes.legitimacy, color: 'from-blue-500 to-blue-700', desc: 'Perceived fairness & credibility' },
            { label: 'Violence Risk Index', val: outcomes.violenceRisk, color: 'from-red-500 to-amber-600', desc: 'Likelihood of electoral violence', invert: true },
            { label: 'Citizen Participation', val: outcomes.participation, color: 'from-emerald-500 to-emerald-700', desc: 'Active civic engagement' },
            { label: 'Institutional Trust', val: outcomes.trust, color: 'from-purple-500 to-purple-700', desc: 'Confidence in electoral bodies' },
          ].map((o) => (
            <div key={o.label} className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-sm text-slate-600 mb-1">{o.label}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-bold text-slate-900">{Math.round(o.val)}</span>
                <span className="text-sm text-slate-500">/100</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                <div className={`h-full bg-gradient-to-r ${o.color} transition-all duration-300`} style={{ width: `${o.val}%` }} />
              </div>
              <p className="text-xs text-slate-500">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparative Analysis */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <GitCompareArrows size={18} className="text-emerald-700" />
          <h3 className="font-bold text-slate-900">Comparative Analysis — Geopolitical Units</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {UNITS.map((u) => {
            const sel = selectedUnits.includes(u.name);
            return (
              <button
                key={u.name}
                onClick={() => toggleUnit(u.name)}
                className={`text-left p-4 rounded-xl border transition ${
                  sel ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-slate-500" />
                  <span className="font-semibold text-slate-900 text-sm">{u.name}</span>
                </div>
                <p className="text-xs text-slate-600">Population: {u.pop}</p>
                <span
                  className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full font-medium ${
                    u.risk === 'High'
                      ? 'bg-red-100 text-red-700'
                      : u.risk === 'Medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {u.risk} Risk
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-4">
          Selected {selectedUnits.length} units — comparative dashboards will render trend overlays, demographic deltas, and intervention efficacy.
        </p>
      </div>
    </div>
  );
};

export default Planning;
