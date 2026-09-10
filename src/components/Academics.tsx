import React from 'react';
import { GraduationCap, Award, BookOpen, School, CheckCircle2, Trophy } from 'lucide-react';

export const Academics: React.FC = () => {
  const academicSteps = [
    {
      period: '2024 — 2028 (Present)',
      title: 'B.Tech in Computer Science Engineering (AI & ML)',
      institution: 'SRM Institute of Science and Technology (SRMIST)',
      score: '8.91 CGPA',
      scoreLabel: 'First Year CGPA',
      details: [
        'Specializing in Artificial Intelligence and Machine Learning',
        'Sophomore / Second Year Student',
        'Strong focus on Data Structures & Algorithms, Object-Oriented Programming, and Machine Learning foundations',
      ],
      icon: GraduationCap,
      accent: 'text-accent-cyan',
      borderAccent: 'hover:border-accent-cyan/60',
    },
    {
      period: '2024',
      title: 'JEE Main Examination Performance',
      institution: 'National Testing Agency (NTA)',
      score: 'Top 8%',
      scoreLabel: 'National Percentile Bracket',
      details: [
        'Placed in top 8% percentile nationally',
        'Demonstrated strong analytical problem solving in Physics, Chemistry, and Mathematics',
      ],
      icon: Trophy,
      accent: 'text-accent-violet',
      borderAccent: 'hover:border-accent-violet/60',
    },
    {
      period: '2022 — 2024',
      title: 'Class 12 Senior Secondary (PCM Board)',
      institution: 'Delhi Public School (DPS) Vijayawada',
      score: '86%',
      scoreLabel: 'PCM Aggregate Score',
      details: [
        'Physics, Chemistry, and Mathematics focus',
        'Built foundational computational logic and mathematical rigor',
      ],
      icon: School,
      accent: 'text-accent-emerald',
      borderAccent: 'hover:border-accent-emerald/60',
    },
    {
      period: '2022',
      title: 'Class 10 Secondary Education',
      institution: 'Delhi Public School (DPS) Vijayawada',
      score: '94%',
      scoreLabel: 'Board Examination Score',
      details: [
        'Excellence in Mathematics, Science, and English',
        'Active participation in school activities and science expos',
      ],
      icon: BookOpen,
      accent: 'text-accent-amber',
      borderAccent: 'hover:border-accent-amber/60',
    },
  ];

  return (
    <section id="academics" className="relative py-24 rule-b bg-paper/40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-accent-cyan mb-2">
              <span>02 / ACADEMIC FOUNDATION</span>
              <span className="h-px w-12 bg-rule" />
              <span>EDUCATION & ACHIEVEMENTS</span>
            </div>
            <h2 className="font-serif font-black text-4xl sm:text-5xl text-ink">
              Academic Excellence & Rigor.
            </h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-card border border-rule font-mono text-xs text-muted">
            <Award className="w-4 h-4 text-accent-cyan" />
            <span>DPS Vijayawada → SRMIST AI/ML</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {academicSteps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl bg-card border border-rule ${item.borderAccent} transition-all duration-300 shadow-xl relative group flex flex-col justify-between`}
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-muted">{item.period}</span>
                    <div className={`p-2.5 rounded-xl bg-paper border border-rule ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-ink mb-1 group-hover:text-accent-cyan transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs text-muted mb-6">{item.institution}</p>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 font-sans text-sm text-muted mb-6">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${item.accent}`} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stat Score Box */}
                <div className="pt-4 border-t border-rule flex items-center justify-between">
                  <span className="font-mono text-xs text-muted">{item.scoreLabel}</span>
                  <span className={`font-serif text-3xl font-bold ${item.accent}`}>
                    {item.score}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
