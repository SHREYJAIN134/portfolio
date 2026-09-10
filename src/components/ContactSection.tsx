import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, Copy, ExternalLink, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'shreyjn85@gmail.com';
  const phoneNumber = '7093265714';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 rule-b bg-paper/40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 font-mono text-xs text-accent-cyan mb-8">
          <span>05 / CONNECT & TALK</span>
          <span className="h-px w-12 bg-rule" />
          <span>START A CONVERSATION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Social Links */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h2 className="font-serif font-black text-4xl sm:text-6xl text-ink leading-tight">
              Let's talk, <br />
              <em className="italic font-serif text-accent-cyan font-normal">build something</em> <br />
              meaningful.
            </h2>

            <p className="font-sans text-base sm:text-lg text-muted leading-relaxed">
              Whether you want to discuss AI models, student projects, understand different perspectives, or simply have a memorable conversation—my inbox and phone line are open.
            </p>

            {/* Direct Social & Contact Cards */}
            <div className="space-y-3.5 pt-2">
              
              {/* Email Link */}
              <a
                href={`mailto:${emailAddress}`}
                className="group p-4 sm:p-5 rounded-2xl bg-card border border-rule hover:border-accent-cyan transition-all flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-paper border border-rule text-accent-cyan group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif font-bold text-base sm:text-lg text-ink block group-hover:text-accent-cyan transition-colors">
                      Email Address
                    </span>
                    <span className="font-mono text-xs text-muted truncate block">{emailAddress}</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted group-hover:text-accent-cyan transition-colors shrink-0 ml-2" />
              </a>

              {/* Phone Link */}
              <a
                href={`tel:${phoneNumber}`}
                className="group p-4 sm:p-5 rounded-2xl bg-card border border-rule hover:border-accent-emerald transition-all flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-paper border border-rule text-accent-emerald group-hover:scale-110 transition-transform shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif font-bold text-base sm:text-lg text-ink block group-hover:text-accent-emerald transition-colors">
                      Phone Number
                    </span>
                    <span className="font-mono text-xs text-muted truncate block">+91 {phoneNumber}</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted group-hover:text-accent-emerald transition-colors shrink-0 ml-2" />
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/shrey-jain-7b717436a/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl bg-card border border-rule hover:border-accent-cyan transition-all flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-paper border border-rule text-accent-cyan group-hover:scale-110 transition-transform shrink-0">
                    <LinkedinIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif font-bold text-base sm:text-lg text-ink block group-hover:text-accent-cyan transition-colors">
                      LinkedIn Profile
                    </span>
                    <span className="font-mono text-xs text-muted truncate block">in/shrey-jain-7b717436a</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted group-hover:text-accent-cyan transition-colors shrink-0 ml-2" />
              </a>

              {/* Instagram Profile */}
              <a
                href="https://www.instagram.com/shrey_jain767?stkn=d2JvOHZiam0wOGx1"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl bg-card border border-rule hover:border-accent-violet transition-all flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-paper border border-rule text-accent-violet group-hover:scale-110 transition-transform shrink-0">
                    <InstagramIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif font-bold text-base sm:text-lg text-ink block group-hover:text-accent-violet transition-colors">
                      Instagram Profile
                    </span>
                    <span className="font-mono text-xs text-muted truncate block">@shrey_jain767</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted group-hover:text-accent-violet transition-colors shrink-0 ml-2" />
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/SHREYJAIN134"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-5 rounded-2xl bg-card border border-rule hover:border-ink transition-all flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-paper border border-rule text-ink group-hover:scale-110 transition-transform shrink-0">
                    <GithubIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-serif font-bold text-base sm:text-lg text-ink block group-hover:text-accent-cyan transition-colors">
                      GitHub Profile
                    </span>
                    <span className="font-mono text-xs text-muted truncate block">@SHREYJAIN134</span>
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted group-hover:text-ink transition-colors shrink-0 ml-2" />
              </a>

            </div>

            {/* Copy Email Helper */}
            <div className="p-4 sm:p-5 rounded-2xl bg-card border border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-5 h-5 text-accent-cyan shrink-0" />
                <span className="font-mono text-xs text-ink truncate">{emailAddress}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-paper border border-rule hover:border-accent-cyan text-xs font-mono text-muted hover:text-ink transition-all flex items-center justify-center gap-1.5"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-accent-emerald" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-rule shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between font-mono text-xs text-muted pb-4 border-b border-rule">
                <span className="flex items-center gap-2 text-accent-cyan">
                  <MessageSquare className="w-4 h-4" /> DIRECT MESSAGE
                </span>
                <span>RESPONSE TIME &lt; 24h</span>
              </div>

              {formSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent-emerald/20 border-2 border-accent-emerald text-accent-emerald mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink">Message Sent!</h3>
                  <p className="font-sans text-sm text-muted max-w-sm mx-auto">
                    Thank you for reaching out. I will read your message and get back to you soon.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-paper border border-rule text-xs font-mono text-muted hover:text-ink transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="block font-mono text-xs text-muted mb-2">YOUR NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-paper border border-rule text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent-cyan font-sans text-base sm:text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-muted mb-2">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-paper border border-rule text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent-cyan font-sans text-base sm:text-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-muted mb-2">YOUR MESSAGE</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi Shrey, I saw your portfolio and would love to connect..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-paper border border-rule text-ink placeholder:text-muted/50 focus:outline-none focus:border-accent-cyan font-sans text-base sm:text-sm transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-accent-cyan text-background font-sans font-bold text-sm hover:bg-accent-cyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.25)]"
                  >
                    Send Message <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
