"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

// Custom Kaggle icon
function KaggleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.071.312z" />
    </svg>
  );
}

const socialLinks = [
  { href: "https://github.com/dipesh4000", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/dipesh4000", icon: Linkedin, label: "LinkedIn" },
  { href: "https://kaggle.com/dipesh4000", icon: KaggleIcon, label: "Kaggle" },
  { href: "mailto:dipeshkumar0853822@gmail.com", icon: Mail, label: "Email" },
  { href: "https://x.com/dipesh4000", icon: Twitter, label: "Twitter" },
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
                className="p-2.5 rounded-full border border-white/10 text-white/40 hover:text-teal-300/90 hover:border-teal-400/35 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/45"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Dipesh Kumar</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
