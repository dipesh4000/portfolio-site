"use client";

import { Github, Linkedin, Mail, Twitter, Heart, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://github.com/dipesh4036",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/dipeshkumar4000/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:dipeshkumar4036@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://x.com/dipesh400",
    icon: Twitter,
    label: "Twitter/X",
  },
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
    <footer className="relative border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-black gradient-text">
                Dipesh Kumar
              </h3>
              <p className="text-white/60 leading-relaxed">
                ML Engineer & Data Scientist building production-grade machine learning systems and scalable backends.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl glass text-white/60 hover:text-white hover:bg-white/10 transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-4 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Get in Touch */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm font-bold text-white/40 uppercase tracking-wider mb-6">
                Get In Touch
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:dipeshkumar4036@gmail.com"
                  className="text-white/60 hover:text-white transition-colors block"
                >
                  dipeshkumar4036@gmail.com
                </a>
                <motion.a
                  href="https://codolio.com/profile/dipesh4000"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-white/80 hover:text-white transition-colors"
                >
                  <Code2 className="w-4 h-4" />
                  View Coding Profile
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Dipesh Kumar. All rights reserved.
          </p>
          <p className="text-sm text-white/40 flex items-center gap-2">
            Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> using Next.js & Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
