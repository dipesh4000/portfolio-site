"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/dipesh4000", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/dipesh4000", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:dipeshkumar0853822@gmail.com", icon: Mail, label: "Email" },
  { href: "https://x.com/dipesh400", icon: Twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-1">Dipesh Kumar</h3>
            <p className="text-sm text-white/40">ML Engineer & Data Scientist</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Dipesh Kumar</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
