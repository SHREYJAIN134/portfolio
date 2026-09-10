import React from 'react';
import { ExternalLink, Layers, Cpu, Code2, Terminal } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Project Match',
      subtitle: 'Student Collaboration & Team Building Platform',
      category: 'Full-Stack / Web App',
      year: '2026',
      description:
        'A full-stack web platform built using Next.js and Supabase designed to connect student developers, designers, and builders. Matches collaborators based on complementary skill sets, domain interests, and project scope.',
      stack: ['Next.js', 'TypeScript', 'React', 'Supabase', 'Tailwind CSS', 'Docker'],
      github: 'https://github.com/SHREYJAIN134/project-match',
      demo: 'https://project-match-ten.vercel.app',
      featured: true,
      icon: Layers,
    },
    {
      title: 'Zero-Hallucination QA',
      subtitle: 'Factually Grounded RAG Question-Answering System',
      category: 'AI / Machine Learning',
      year: '2026',
      description:
        'AI research & engineering notebook implementing factual grounding for Question-Answering pipelines. Leverages Retrieval-Augmented Generation (RAG), vector similarity search, and context verification to eliminate LLM hallucinations.',
      stack: ['Python', 'Jupyter Notebook', 'RAG', 'Embeddings', 'LLM Grounding'],
      github: 'https://github.com/SHREYJAIN134/zero-hallucination-qa',
      demo: null,
      featured: true,
      icon: Cpu,
    },
    {
      title: 'OOPS Banner App',
      subtitle: 'Object-Oriented Banner Rendering Engine',
      category: 'Java / Software Design',
      year: '2026',
      description:
        'Web and Java application demonstrating dynamic graphic banner rendering using core Object-Oriented Programming (OOP) principles including polymorphism, encapsulation, and modular design patterns.',
      stack: ['Java', 'OOP Patterns', 'Web UI', 'Component Architecture'],
      github: 'https://github.com/SHREYJAIN134/OOPS-banner-app',
      demo: null,
      featured: false,
      icon: Code2,
    },
    {
      title: 'Snake Water Gun Game',
      subtitle: 'Nostalgic Python Interactive Console/GUI Game',
      category: 'Python Game Dev',
      year: '2025',
      description:
        'An interactive Python application bringing back the classic childhood Snake, Water & Gun game with randomized AI opponents, structured game loops, score tracking, and clean terminal outputs.',
      stack: ['Python', 'Game Logic', 'CLI / Interactive'],
      github: 'https://github.com/SHREYJAIN134/Snake-Water-Gun-game-using-python',
      demo: null,
      featured: false,
      icon: Terminal,
    },
  ];

  return (
    <section id="projects" className="relative py-24 rule-b bg-background">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-accent-cyan mb-3">
              <span>03 / CRAFT & REPOSITORIES</span>
              <span className="h-px w-12 bg-rule" />
              <span>SELECTED PROJECTS</span>
            </div>
            <h2 className="font-serif font-black text-4xl sm:text-5xl text-ink">
              Building software with <br />
              <span className="gradient-text-cyan">intent & precision.</span>
            </h2>
          </div>

          <a
            href="https://github.com/SHREYJAIN134"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs text-accent-cyan hover:underline"
          >
            <span>View all repositories on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon;
            return (
              <article
                key={idx}
                className="group relative p-8 rounded-3xl bg-card border border-rule hover:border-accent-cyan/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Header Meta */}
                  <div className="flex items-center justify-between font-mono text-xs text-muted mb-6">
                    <span className="flex items-center gap-2 text-accent-cyan">
                      <Icon className="w-4 h-4" /> {project.category}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-ink mb-2 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-accent-violet mb-4">{project.subtitle}</p>

                  <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-paper border border-rule font-mono text-[11px] text-muted group-hover:border-rule/80 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-6 border-t border-rule flex items-center gap-4">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-accent-cyan text-background font-mono font-bold text-xs hover:bg-accent-cyan/90 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    >
                      Live Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-paper border border-rule hover:border-ink font-mono text-xs text-ink transition-all flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> Source Code
                  </a>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
