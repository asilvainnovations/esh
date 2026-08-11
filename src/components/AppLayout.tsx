import React, { useState, useRef } from 'react';
import Header from './electoral/Header';
import Sidebar, { ViewKey } from './electoral/Sidebar';
import MobileNav from './electoral/MobileNav';
import Hero from './electoral/Hero';
import Dashboard from './electoral/Dashboard';
import Assessment from './electoral/Assessment';
import Planning from './electoral/Planning';
import Analytics from './electoral/Analytics';
import Policy from './electoral/Policy';
import Academy from './electoral/Academy';
import Collaboration from './electoral/Collaboration';
import Security from './electoral/Security';
import Profile from './electoral/Profile';
import SignInModal from './electoral/SignInModal';
import Footer from './electoral/Footer';
import { useAuth, ROLE_ACCESS, ROLE_LABELS } from '@/contexts/AuthContext';
import { Lock, ShieldAlert, LogIn } from 'lucide-react';

const AppLayout: React.FC = () => {
  const { profile, loading } = useAuth();
  const [view, setView] = useState<ViewKey>('dashboard');
  const [signInOpen, setSignInOpen] = useState(false);
  const [search, setSearch] = useState('');
  const workspaceRef = useRef<HTMLDivElement>(null);

  const handleNav = (v: ViewKey) => {
    setView(v);
    workspaceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const requireAuth = (v: ViewKey) => {
    if (!profile && v !== 'dashboard') {
      setSignInOpen(true);
      return;
    }
    handleNav(v);
  };

  const renderView = () => {
    // Public modules can render without auth: dashboard
    // All other views require sign-in. If user signed in but role lacks access, show locked screen.
    if (!profile && view !== 'dashboard') {
      return (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign in required</h2>
          <p className="text-slate-600 max-w-md mx-auto mb-5">
            This module requires a verified account. Sign in or create one to continue.
          </p>
          <button
            onClick={() => setSignInOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg"
          >
            <LogIn size={16} />
            Sign In to Continue
          </button>
        </div>
      );
    }

    if (profile && view !== 'dashboard' && view !== 'profile' && !ROLE_ACCESS[profile.role].includes(view)) {
      return (
        <div className="bg-white border border-amber-200 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
          <p className="text-slate-600 max-w-md mx-auto mb-2">
            Your current role <span className="font-semibold">{ROLE_LABELS[profile.role]}</span> does not have access to this module.
          </p>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-5">
            Request a role upgrade from your workspace administrator, or return to the dashboard.
          </p>
          <button
            onClick={() => handleNav('dashboard')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg"
          >
            <Lock size={16} />
            Back to Dashboard
          </button>
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return <Dashboard onNavigate={requireAuth} />;
      case 'assessment':
        return <Assessment />;
      case 'planning':
        return <Planning />;
      case 'analytics':
        return <Analytics />;
      case 'policy':
        return <Policy />;
      case 'academy':
        return <Academy />;
      case 'collaboration':
        return <Collaboration />;
      case 'security':
        return <Security />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard onNavigate={requireAuth} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header
        onSignIn={() => setSignInOpen(true)}
        onSearch={setSearch}
        searchQuery={search}
        onOpenProfile={() => handleNav('profile')}
      />

      <Hero
        onStartAssessment={() => requireAuth('assessment')}
        onWatchDemo={() => setSignInOpen(true)}
      />

      <MobileNav current={view} onChange={requireAuth} />

      <div ref={workspaceRef} className="max-w-[1600px] mx-auto flex">
        <Sidebar current={view} onChange={handleNav} onRequireSignIn={() => setSignInOpen(true)} />

        <main className="flex-1 min-w-0 px-4 lg:px-8 py-8">{renderView()}</main>
      </div>

      <Footer />

      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </div>
  );
};

export default AppLayout;
