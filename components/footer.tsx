"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://github.com/dipesh4000",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/dipesh4000",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:dipeshkumar0853822@gmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://x.com/dipesh400",
    icon: Twitter,
    label: "Twitter/X",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">
              Dipesh Kumar
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              ML Engineer · Data Science · Backend
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Dipesh Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
