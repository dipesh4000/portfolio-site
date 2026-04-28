"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/dipesh4036", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/dipeshkumar4000/", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:dipeshkumar4036@gmail.com", icon: Mail, label: "Email" },
  { href: "https://x.com/dipesh400", icon: Twitter, label: "Twitter" },
];

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#coding-stats", label: "Stats" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Dipesh Kumar</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              ML Engineer & Data Scientist building production-grade machine learning systems.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:dipeshkumar4036@gmail.com"
                className="text-sm text-white/50 hover:text-white transition-colors block"
              >
                dipeshkumar4036@gmail.com
              </a>
              <a
                href="https://codolio.com/profile/dipesh4000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Coding Profile
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Dipesh Kumar. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
