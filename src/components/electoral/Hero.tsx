import React from 'react';
import { ArrowRight, Play, ShieldCheck, TrendingUp, Globe2 } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
  onWatchDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartAssessment, onWatchDemo }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      {/* Glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-[1600px] mx-auto px-4 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Powered by the Electoral Assessment Framework
          </div>

          <h1 className="font-serif text-4xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
            Evidence-Based Democracy:
            <span className="block bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
              From Assessment to Action.
            </span>
          </h1>

          <p className="text-lg text-blue-100 max-w-xl mb-8 leading-relaxed">
            Empower political scientists, election officers, and policymakers to plan evidence-based strategies,
            design capacity-strengthening programs, and craft effective electoral interventions across geopolitical units.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={onStartAssessment}
              className="group inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3.5 rounded-lg transition shadow-lg shadow-emerald-500/30"
            >
              Start Electoral Assessment
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </button>
            <button
              onClick={onWatchDemo}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 font-semibold px-6 py-3.5 rounded-lg transition"
            >
              <Play size={16} />
              Watch Platform Demo
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold">6</p>
              <p className="text-xs text-blue-200">EAF Phases</p>
            </div>
            <div>
              <p className="text-3xl font-bold">120+</p>
              <p className="text-xs text-blue-200">Case Studies</p>
            </div>
            <div>
              <p className="text-3xl font-bold">42</p>
              <p className="text-xs text-blue-200">Countries Active</p>
            </div>
          </div>
        </div>

        {/* Live indicator card */}
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-blue-200 uppercase tracking-wider font-medium">Live Assessment Indicators</p>
                <p className="font-semibold">Global Electoral Health Index</p>
              </div>
              <Globe2 size={24} className="text-emerald-300" />
            </div>

            <div className="space-y-3">
              {[
                { label: 'Voter Registration Integrity', val: 87, color: 'bg-emerald-400' },
                { label: 'Electoral Security Score', val: 72, color: 'bg-amber-400' },
                { label: 'Civic Education Coverage', val: 64, color: 'bg-blue-400' },
                { label: 'Institutional Resilience', val: 79, color: 'bg-purple-400' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-blue-100">{m.label}</span>
                    <span className="font-semibold">{m.val}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`${m.color} h-full rounded-full transition-all duration-1000`} style={{ width: `${m.val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-white/10">
              <div className="bg-white/5 rounded-lg p-3">
                <ShieldCheck size={16} className="text-emerald-300 mb-1" />
                <p className="text-xs text-blue-200">Active Risk Alerts</p>
                <p className="font-bold text-lg">14 Regions</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <TrendingUp size={16} className="text-amber-300 mb-1" />
                <p className="text-xs text-blue-200">Programs Deployed</p>
                <p className="font-bold text-lg">238 Active</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            LIVE DATA
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
