import React, { useState } from 'react';
import { Vote, Loader2, Check, ExternalLink } from 'lucide-react';

// External link configuration - centralized for easy maintenance
const EXTERNAL_LINKS = {
  resources: {
    eafToolkit: 'https://sjbdpedlfwwszvsnrspi.databasepad.com/storage/v1/object/public/next-tasks/public/Electoral_Assessment_Framework-Toolkit%2BFINAL%2B(1)%2B(1).pdf',
    bestPractices: 'https://www.drghub.org/s/Crisis-Communications-Guide-Feb4_NDI-Website.pdf',
    caseStudies: 'https://www.drghub.org/s/collective_action_practical_guide_for_usaid_missions_july2022.pdf',
    apiDocs: '#', // TODO: Add API documentation URL
    researchLibrary: 'https://www.drghub.org/resources',
  },
  organization: {
    main: 'https://asilvainnovations.com',
    about: 'https://asilvainnovations.github.io/website/about-us.html',
    methodology: 'https://asilvainnovations.github.io/website/about-us.html#our-approach',
    partners: 'https://asilvainnovations.github.io/website/partnerships.html',
    privacy: 'https://asilvainnovations.github.io/website/privacy-policy.html',
    contact: 'https://asilvainnovations.github.io/website/contact.html',
  },
} as const;

// Platform links - TODO: Replace '#' with actual internal route paths
const PLATFORM_LINKS = [
  { label: 'EAF Assessment', href: '#' },
  { label: 'Strategic Planning', href: '#' },
  { label: 'Survey Hub', href: '#' },
  { label: 'Policy Studio', href: '#' },
  { label: 'Capacity Academy', href: '#' },
] as const;

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await fetch('https://famous.ai/api/crm/69f321591e9e21f837637be4/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer-signup',
          tags: ['newsletter', 'eaf-platform'],
        }),
      });
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
    }
  };

  // Helper component for external links with security attributes
  const ExternalAnchor: React.FC<{
    href: string;
    children: React.ReactNode;
    className?: string;
    showIcon?: boolean;
  }> = ({ href, children, className = '', showIcon = false }) => {
    const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
    
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center gap-1 ${className}`}
      >
        {children}
        {showIcon && isExternal && <ExternalLink size={12} className="opacity-60" />}
      </a>
    );
  };

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white">
                <Vote size={22} />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Electoral Strategy Hub</p>
                <p className="text-xs text-slate-400">Electoral Assessment & Strategy</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-md">
              Empowering political scientists, election officers, and policymakers worldwide to plan
              evidence-based strategies and design capacity-strengthening programs for democratic resilience.
            </p>

            <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="Get the monthly Democracy Brief"
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none text-sm text-white placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition disabled:opacity-60"
              >
                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {status === 'success' && <Check size={16} />}
                {status === 'success' ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-xs text-emerald-400 mt-2">Thanks — check your inbox to confirm.</p>
            )}
          </div>

          {/* Platform Section (Internal Routes - TODO: Update hrefs) */}
          <div>
            <p className="text-white font-semibold mb-3 text-sm">Platform</p>
            <ul className="space-y-2">
              {PLATFORM_LINKS.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-sm text-slate-400 hover:text-white transition inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.href === '#' && <span className="text-[10px] text-amber-500/70">⚠️</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section (External Links) */}
          <div>
            <p className="text-white font-semibold mb-3 text-sm">Resources</p>
            <ul className="space-y-2">
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.resources.eafToolkit} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  EAF Toolkit
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.resources.bestPractices} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  Best Practices
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.resources.caseStudies} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  Case Studies
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.resources.apiDocs} 
                  className="text-sm text-slate-400 hover:text-white transition"
                >
                  API Docs
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.resources.researchLibrary} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  Research Library
                </ExternalAnchor>
              </li>
            </ul>
          </div>

          {/* Organization Section (External Links) */}
          <div>
            <p className="text-white font-semibold mb-3 text-sm">
              <ExternalAnchor 
                href={EXTERNAL_LINKS.organization.main} 
                className="hover:text-white transition"
                showIcon
              >
                Organization
              </ExternalAnchor>
            </p>
            <ul className="space-y-2">
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.organization.about} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  About
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.organization.methodology} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  Methodology
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.organization.partners} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  Partners
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.organization.privacy} 
                  className="text-sm text-slate-400 hover:text-white transition"
                >
                  Privacy & Ethics
                </ExternalAnchor>
              </li>
              <li>
                <ExternalAnchor 
                  href={EXTERNAL_LINKS.organization.contact} 
                  className="text-sm text-slate-400 hover:text-white transition"
                  showIcon
                >
                  Contact
                </ExternalAnchor>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 ESH Platform · Powered by{' '}
            <ExternalAnchor 
              href={EXTERNAL_LINKS.organization.main} 
              className="text-slate-400 hover:text-white transition"
            >
              ASilva Innovations
            </ExternalAnchor>
          </p>
          <div className="flex gap-4 flex-wrap">
            <ExternalAnchor 
              href={EXTERNAL_LINKS.organization.privacy} 
              className="hover:text-white transition"
            >
              Privacy Policy
            </ExternalAnchor>
            <ExternalAnchor 
              href="https://asilvainnovations.github.io/website/terms.html" 
              className="hover:text-white transition"
              showIcon
            >
              Terms of Service
            </ExternalAnchor>
            <ExternalAnchor 
              href="https://asilvainnovations.github.io/website/ai-ethics.html" 
              className="hover:text-white transition"
              showIcon
            >
              AI Ethics
            </ExternalAnchor>
            <ExternalAnchor 
              href="https://asilvainnovations.github.io/website/accessibility-policy.html" 
              className="hover:text-white transition"
              showIcon
            >
              Accessibility Policy
            </ExternalAnchor>
            <ExternalAnchor 
              href="https://asilvainnovations.github.io/website/cookie-policy.html" 
              className="hover:text-white transition"
              showIcon
            >
              Cookie Policy
            </ExternalAnchor>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;