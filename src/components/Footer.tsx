import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background rule-t py-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-muted">
        
        {/* Left Signature */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-card border border-rule flex items-center justify-center font-bold text-accent-cyan text-xs">
            SJ
          </div>
          <div>
            <span className="text-ink font-semibold block">© 2026 Shrey Jain</span>
            <span>B.Tech CSE (AI & ML) @ SRMIST · Andhra Pradesh</span>
          </div>
        </div>

        {/* Philosophy Note */}
        <p className="font-serif italic text-xs text-muted/80 text-center max-w-md">
          "Falling in love with the roots rather than the flower, because that saves me in the autumn."
        </p>

        {/* Right Social Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/SHREYJAIN134"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-cyan transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/shrey-jain-7b717436a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-cyan transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/shrey_jain767?stkn=d2JvOHZiam0wOGx1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-violet transition-colors"
              title="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-card border border-rule hover:border-accent-cyan text-accent-cyan transition-all flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
