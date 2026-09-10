import React from 'react';
import { Heart, Users, Sprout, Quote, Sparkles, MapPin, Globe } from 'lucide-react';

export const AboutPhilosophy: React.FC = () => {
  return (
    <section id="about" className="relative py-24 rule-b overflow-hidden bg-background">
      {/* Background Subtle Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-accent-cyan mb-8">
          <span>01 / ROOTS, MINDSET & PERSPECTIVES</span>
          <span className="h-px w-12 bg-rule" />
          <span>ABOUT ME</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Core Quote & People-Centric Philosophy */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight">
              Curious about mindsets, <br />
              <em className="italic font-serif text-accent-cyan font-normal">learning from everyone.</em>
            </h2>

            <p className="font-sans text-lg text-muted leading-relaxed">
              I am a genuine <strong className="text-ink font-semibold">people person</strong> who thrives on building real connections. Rather than viewing interactions purely as networking, I approach every conversation with deep curiosity—seeking to understand how different people view the world and what lessons they carry.
            </p>

            {/* Signature Philosophy Quote Card */}
            <div className="relative group p-8 rounded-3xl bg-card border border-rule hover:border-accent-cyan/50 transition-all duration-500 shadow-2xl">
              <Quote className="w-10 h-10 text-accent-cyan/30 mb-4 group-hover:text-accent-cyan transition-colors" />
              
              <blockquote className="font-serif italic text-2xl sm:text-3xl text-ink leading-snug">
                "I believe in falling in love with the <span className="text-accent-cyan font-normal not-italic underline decoration-accent-cyan/40 underline-offset-8">roots</span> rather than the flower, because that saves me in the autumn."
              </blockquote>

              <div className="mt-6 pt-6 border-t border-rule flex items-center justify-between font-mono text-xs text-muted">
                <span className="flex items-center gap-2 text-accent-cyan">
                  <Sprout className="w-4 h-4" /> Personal Philosophy
                </span>
                <span>Shrey Jain</span>
              </div>
            </div>

            {/* Geographic Roots Card: Andhra Pradesh & Rajasthan */}
            <div className="p-6 rounded-2xl bg-paper/60 border border-rule space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan">
                <MapPin className="w-4 h-4" /> GEOGRAPHIC & ANCESTRAL ROOTS
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card border border-rule">
                  <span className="font-mono text-[10px] text-muted block uppercase">Home & Background</span>
                  <h4 className="font-serif text-lg font-bold text-ink mt-0.5">Andhra Pradesh</h4>
                  <p className="font-sans text-xs text-muted mt-1">
                    My home for the past 19 years. I completed schooling at DPS Vijayawada before joining SRMIST.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-rule">
                  <span className="font-mono text-[10px] text-muted block uppercase">Ancestral Lineage</span>
                  <h4 className="font-serif text-lg font-bold text-accent-violet mt-0.5">Rajasthan</h4>
                  <p className="font-sans text-xs text-muted mt-1">
                    Carrying the cultural heritage, values, and traditions of my Rajasthani ancestry.
                  </p>
                </div>
              </div>

              {/* Languages Box */}
              <div className="pt-2 flex items-center justify-between font-mono text-xs text-muted border-t border-rule/50">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-accent-emerald" /> Languages: <strong className="text-ink">Hindi, English, Telugu</strong>
                </span>
                <span className="text-[11px] text-accent-cyan">Primary: Hindi & English</span>
              </div>
            </div>

          </div>

          {/* Right Column: Key Personality Story Cards */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-2xl bg-card border border-rule hover:border-rule/80 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent-cyan font-semibold">FACET 01</span>
                <Users className="w-5 h-5 text-accent-cyan" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Connecting & Understanding</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                I love talking to people and having meaningful, memorable conversations. I strive to understand people's perspectives and mindsets before making judgements, believing there is a valuable lesson to learn from everyone I meet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-rule hover:border-rule/80 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent-violet font-semibold">FACET 02</span>
                <Sparkles className="w-5 h-5 text-accent-violet" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Unpredictable & Open-Minded</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                I embrace an unpredictable nature—my thoughts, conversation angles, and next creative pursuits don't fit into rigid boxes. This spontaneity keeps my approach fresh, flexible, and open to unexpected insights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-rule hover:border-rule/80 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-accent-emerald font-semibold">FACET 03</span>
                <Heart className="w-5 h-5 text-accent-emerald" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-ink">Authentic Identity Note</h3>
              <p className="font-sans text-sm text-muted leading-relaxed">
                As I put it simply: <em className="italic text-ink font-serif font-medium">"I love being an inat."</em> I value staying true to myself, preserving authenticity over conforming to standard labels.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
