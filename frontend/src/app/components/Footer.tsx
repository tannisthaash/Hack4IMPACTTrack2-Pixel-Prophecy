import { Link } from 'react-router';
import { Leaf, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full mt-auto shrink-0 bg-muted/50 dark:bg-[#020617] border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Branding */}
          <div>
            <Link to="/" className="flex items-center gap-2 group mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                LastBite
              </span>
            </Link>
            <p className="text-sm font-medium text-foreground/70 mb-1">From Waste to Worth</p>
            <p className="text-xs text-foreground/50 leading-relaxed">
              Connecting surplus food with those who need it most.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-foreground/60 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <a href="/#how-it-works" className="text-sm text-foreground/60 hover:text-primary transition-colors">How it Works</a>
              </li>
              <li>
                <Link to="/impact" className="text-sm text-foreground/60 hover:text-primary transition-colors">Impact</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-foreground/60 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">About LastBite</h4>
            <p className="text-sm text-foreground/60 leading-relaxed">
              A premium food rescue platform bridging restaurants, NGOs, and volunteers to ensure perfectly good food reaches those who need it.
            </p>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-foreground/[0.06] border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-foreground/[0.06] border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-foreground/[0.06] border border-border flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} LastBite. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-foreground/40">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
