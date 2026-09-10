import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Identity', href: '#hero', num: '00' },
    { name: 'Roots & Mindset', href: '#about', num: '01' },
    { name: 'Academics', href: '#academics', num: '02' },
    { name: 'Projects', href: '#projects', num: '03' },
    { name: 'Hobbies', href: '#hobbies', num: '04' },
    { name: 'Contact', href: '#contact', num: '05' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md rule-b py-3 shadow-2xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Monogram & Status */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-card border border-rule flex items-center justify-center font-mono font-bold text-accent-cyan text-sm group-hover:border-accent-cyan/60 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all">
            SJ
          </div>
          <div>
            <span className="font-mono text-xs text-ink uppercase tracking-wider block font-semibold">
              SHREY JAIN
            </span>
            <span className="font-mono text-[10px] text-muted flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse"></span>
              SRMIST CSE (AI/ML)
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-muted hover:text-accent-cyan transition-colors flex items-center gap-1.5 group"
            >
              <span className="text-[10px] text-accent-cyan/70 font-semibold">{link.num}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">{link.name}</span>
            </a>
          ))}
        </nav>

        {/* Quick Actions & Social Links */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/SHREYJAIN134"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted hover:text-ink hover:bg-card border border-transparent hover:border-rule rounded-lg transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/shrey-jain-7b717436a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted hover:text-ink hover:bg-card border border-transparent hover:border-rule rounded-lg transition-all"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/shrey_jain767?stkn=d2JvOHZiam0wOGx1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted hover:text-accent-violet hover:bg-card border border-transparent hover:border-rule rounded-lg transition-all"
            title="Instagram Profile"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="font-mono text-xs px-4 py-2 rounded-lg bg-card border border-rule hover:border-accent-cyan text-accent-cyan hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all flex items-center gap-1.5"
          >
            Let's Talk <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-muted hover:text-ink border border-rule rounded-lg bg-card"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-xl rule-b px-6 py-6 border-b border-rule">
          <nav className="flex flex-col gap-4 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-ink hover:text-accent-cyan py-2 flex items-center justify-between border-b border-rule/50"
              >
                <span className="flex items-center gap-3">
                  <span className="text-accent-cyan font-semibold text-xs">{link.num}</span>
                  {link.name}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted" />
              </a>
            ))}
            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://github.com/SHREYJAIN134"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-paper border border-rule flex items-center justify-center gap-2 text-xs text-muted"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shrey-jain-7b717436a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-lg bg-paper border border-rule flex items-center justify-center gap-2 text-xs text-muted"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="https://www.instagram.com/shrey_jain767?stkn=d2JvOHZiam0wOGx1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-paper border border-rule flex items-center justify-center text-accent-violet"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
