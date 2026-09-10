import React from 'react';
import { Music, ExternalLink, Trophy, Sparkles } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

export const HobbiesSection: React.FC = () => {
  return (
    <section id="hobbies" className="relative py-24 rule-b bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-accent-cyan mb-8">
          <span>04 / HOBBIES & PASSIONS</span>
          <span className="h-px w-12 bg-rule" />
          <span>BEYOND COMPUTING & ACADEMICS</span>
        </div>

        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="font-serif font-black text-4xl sm:text-5xl text-ink leading-tight">
              Finding balance through <br />
              <em className="italic font-serif text-accent-cyan font-normal">acoustic strings & sport.</em>
            </h2>
            <p className="font-sans text-lg text-muted leading-relaxed mt-4">
              I believe in pursuing personal hobbies purely for personal peace, enjoyment, and growth rather than status. Whether playing acoustic guitar tunes or staying active on the court, these activities keep me grounded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Guitar Hobby Box */}
            <div className="p-8 rounded-3xl bg-card border border-rule space-y-5 hover:border-accent-cyan/40 transition-all shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent-cyan flex items-center gap-2">
                    <Music className="w-4 h-4" /> ACOUSTIC GUITAR
                  </span>
                  <span className="font-mono text-[10px] text-muted bg-paper px-2.5 py-1 rounded border border-rule uppercase">
                    Personal Hobby
                  </span>
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-ink">Learning Acoustic Chords</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  I enjoy playing guitar casually in my free time. I currently know two songs and play purely for the personal rhythm and balance it brings to my days.
                </p>
              </div>

              {/* Functional Instagram Reel Link */}
              <div className="pt-4 border-t border-rule">
                <a
                  href="https://www.instagram.com/reel/DcmAyq9vArC/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-paper border border-rule hover:border-accent-violet font-mono text-xs text-ink hover:text-accent-violet transition-all group shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4 text-accent-violet" />
                  <span>Watch My Guitar Reel on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-accent-violet transition-colors" />
                </a>
              </div>
            </div>

            {/* Badminton Hobby Box */}
            <div className="p-8 rounded-3xl bg-card border border-rule space-y-5 hover:border-accent-emerald/40 transition-all shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-accent-emerald flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> BADMINTON
                  </span>
                  <span className="font-mono text-[10px] text-muted bg-paper px-2.5 py-1 rounded border border-rule uppercase">
                    Sport & Fitness
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-ink">Active on the Court</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Badminton is one of my favorite ways to stay active, sharpen my reflexes, and enjoy friendly competition with peers.
                </p>
              </div>

              <div className="pt-4 border-t border-rule font-mono text-xs text-muted flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-emerald" />
                <span>Recreational & Competitive Play</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
