import React, { useState } from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ArrowRight, Sparkles, Upload, Users } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export const Hero: React.FC = () => {
  const [photoUrl, setPhotoUrl] = useState<string>('/assets/shrey-portrait.jpg');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden rule-b">
      {/* Interactive 3D WebGL Background */}
      <Hero3DCanvas />

      {/* Decorative Cyber Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-accent-violet/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Identity & People-First Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-card/80 border border-rule font-mono text-xs text-accent-cyan">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-ping" />
              <span>00 / IDENTITY & PERSPECTIVES</span>
              <span className="text-muted">|</span>
              <span className="text-ink">SRMIST CSE (AI/ML)</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-serif italic text-2xl text-muted font-light">Hello, I am</h2>
              <h1 className="font-serif font-black text-6xl sm:text-7xl xl:text-8xl tracking-tight uppercase leading-[0.95] text-ink">
                SHREY <br />
                <span className="gradient-text-cyan">JAIN.</span>
              </h1>
            </div>

            <p className="font-sans text-lg sm:text-xl text-muted max-w-2xl leading-relaxed">
              A second-year <strong className="text-ink font-semibold">B.Tech CSE student specializing in AI & ML</strong> at <span className="text-accent-cyan font-medium">SRMIST</span>. At my core, I am a <em className="italic text-ink font-serif font-medium">people person</em>—fascinated by how different individuals think, eager to understand diverse mindsets, and convinced that every conversation holds something worth learning.
            </p>

            {/* Quick Facts & Milestones Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-card/60 border border-rule hover:border-accent-cyan/40 transition-all">
                <span className="block font-serif text-3xl font-bold text-ink">8.91</span>
                <span className="font-mono text-[11px] text-muted uppercase">1st Year CGPA</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card/60 border border-rule hover:border-accent-violet/40 transition-all">
                <span className="block font-serif text-3xl font-bold text-accent-violet">Top 8%</span>
                <span className="font-mono text-[11px] text-muted uppercase">JEE Main Rank</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card/60 border border-rule hover:border-accent-cyan/40 transition-all">
                <span className="block font-serif text-3xl font-bold text-accent-cyan">AI / ML</span>
                <span className="font-mono text-[11px] text-muted uppercase">SRMIST Branch</span>
              </div>
              <div className="p-3.5 rounded-xl bg-card/60 border border-rule hover:border-accent-emerald/40 transition-all">
                <span className="block font-serif text-3xl font-bold text-accent-emerald">19 Yrs</span>
                <span className="font-mono text-[11px] text-muted uppercase">Andhra Pradesh</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#about"
                className="px-6 py-3.5 rounded-xl bg-accent-cyan text-background font-sans font-bold text-sm hover:bg-accent-cyan/90 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)]"
              >
                Discover My Story & Mindset <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/shrey-jain-7b717436a/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-card border border-rule hover:border-accent-cyan text-ink font-sans font-medium text-sm transition-all flex items-center gap-2"
              >
                <LinkedinIcon className="w-4 h-4 text-accent-cyan" /> LinkedIn Profile
              </a>
              <a
                href="https://github.com/SHREYJAIN134"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-card border border-rule hover:border-ink text-muted hover:text-ink transition-all"
                title="My GitHub Profile"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/shrey_jain767?stkn=d2JvOHZiam0wOGx1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-card border border-rule hover:border-accent-violet text-muted hover:text-accent-violet transition-all"
                title="My Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Holographic Portrait Stage with Updated Photo */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group w-full max-w-md">
              
              {/* Outer Holographic Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-cyan rounded-3xl blur-xl opacity-40 group-hover:opacity-80 transition duration-700 pointer-events-none" />

              {/* Glass Frame Container */}
              <div className="relative rounded-3xl bg-card/90 border border-rule p-6 space-y-5 shadow-2xl backdrop-blur-xl">
                
                {/* Frame Header */}
                <div className="flex items-center justify-between font-mono text-xs text-muted border-b border-rule pb-3">
                  <span className="flex items-center gap-2 text-accent-cyan">
                    <Sparkles className="w-4 h-4" /> FIG 01. PORTRAIT CANVAS
                  </span>
                  <span className="text-[10px] bg-paper px-2 py-0.5 rounded border border-accent-cyan/30 text-accent-cyan">
                    3D HOLOGRAM ACTIVE
                  </span>
                </div>

                {/* Portrait Visual Stage */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-paper border border-rule/80 flex flex-col items-center justify-center group/photo shadow-inner">
                  {/* Photo rendered with subtle 3D hover scale */}
                  <img
                    src={photoUrl}
                    alt="Shrey Jain Portrait"
                    className="w-full h-full object-cover object-top group-hover/photo:scale-105 transition-transform duration-700 filter saturate-[1.05] contrast-[1.02]"
                  />

                  {/* Futuristic Scanning Line Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent h-12 w-full animate-shimmer pointer-events-none" />

                  {/* Holographic Bottom Metadata Badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-background/90 backdrop-blur-md border border-rule/80 text-left space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-accent-cyan uppercase tracking-wider">
                      <span>Identity Verification</span>
                      <span className="text-accent-emerald flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span> Online
                      </span>
                    </div>
                    <p className="font-sans text-xs text-ink font-medium">
                      Shrey Jain — Curiosity-Driven SRMIST Student
                    </p>
                    <p className="font-mono text-[10px] text-muted">
                      Andhra Pradesh (19 yrs) · Rajasthan Ancestry
                    </p>
                  </div>
                </div>

                {/* Photo Switcher Label */}
                <div className="flex items-center justify-between font-mono text-[11px] text-muted pt-1">
                  <span>DPS Vijayawada → SRMIST</span>
                  <label className="cursor-pointer text-accent-cyan hover:underline flex items-center gap-1 text-[11px]">
                    <Upload className="w-3 h-3" /> Update My Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Ticker / Personal Philosophy Strip */}
      <div className="relative z-10 border-t border-rule bg-paper/40 py-3.5 mt-12">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted">
          <span className="text-accent-cyan flex items-center gap-2">
            <Users className="w-3.5 h-3.5" /> 00 / MINDSET & CONNECTIONS
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-ink font-sans">
            <span>People-Centric</span>
            <span className="text-rule">·</span>
            <span>Empathetic Listener</span>
            <span className="text-rule">·</span>
            <span>Always Learning</span>
            <span className="text-rule">·</span>
            <span className="italic font-serif text-accent-cyan">"I love being an inat."</span>
          </div>
          <span className="text-accent-emerald">SRMIST 2024–2028</span>
        </div>
      </div>
    </section>
  );
};
