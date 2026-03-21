import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, Leaf, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../store/auth';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, role, logout: authLogout } = useAuthStore();
  const currentRole = role || 'restaurant';
  const isLoggedIn = isAuthenticated;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Impact', href: '/impact' },
    { name: 'Contact', href: '/contact' },
    ...(isLoggedIn ? [{ name: 'Dashboard', href: `/${currentRole}/dashboard` }] : []),
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    handleNavClick();
    authLogout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 flex justify-center bg-background/80 dark:bg-background/90 backdrop-blur-xl border-b border-border h-[68px] items-center shrink-0">
      <div className="w-full max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={handleNavClick}>
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
            LastBite
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href.replace('/#', '/')));
            return link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors tracking-wide ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors tracking-wide ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          
          {/* Profile Avatar Icon Only */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
                isLoggedIn
                  ? 'bg-gradient-to-br from-primary to-secondary text-white border-primary/30 shadow-md shadow-primary/20'
                  : 'bg-muted text-foreground/60 border-border hover:border-foreground/20 hover:text-foreground'
              }`}
            >
              <User className="w-4.5 h-4.5" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-card border border-border rounded-2xl overflow-hidden shadow-xl py-1.5"
                >
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" onClick={handleNavClick} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        Sign In
                      </Link>
                      <Link to="/signup" onClick={handleNavClick} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to={`/${currentRole}/profile`} onClick={handleNavClick} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        My Profile
                      </Link>
                      <Link to="/contact" onClick={handleNavClick} className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        Contact Us
                      </Link>
                      <div className="h-px bg-border mx-3 my-1" />
                      <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                        Logout
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-2 rounded-xl hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[68px] left-0 right-0 bg-card border-b border-border shadow-xl overflow-hidden p-4"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-xl transition-colors"
                    onClick={handleNavClick}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted hover:text-primary rounded-xl transition-colors"
                    onClick={handleNavClick}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="h-px bg-border my-2" />
              
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to="/login"
                    className="px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                    onClick={handleNavClick}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-3 text-center text-sm font-medium bg-primary text-primary-foreground rounded-xl"
                    onClick={handleNavClick}
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to={`/${currentRole}/profile`}
                    className="px-4 py-3 text-center text-sm font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
                    onClick={handleNavClick}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-center text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}