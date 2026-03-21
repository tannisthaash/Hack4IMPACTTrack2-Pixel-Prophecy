import { Leaf, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { FloatingInput } from '../components/FloatingInput';
import { useAuthStore } from '../store/auth';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('restaurant', 'User', email);
    navigate('/restaurant/dashboard');
  };

  return (
    <div className="min-h-full flex text-foreground selection:bg-primary/30">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761092315416-ed229b18e3d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwc2hhcmluZyUyMGNvbW11bml0eSUyMHRhYmxlJTIwbWVhbHxlbnwxfHx8fDE3NzM5ODcxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Community food sharing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-secondary/60" />
        <div className="relative z-10 flex items-center justify-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-white text-center space-y-8"
          >
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl flex items-center justify-center shadow-2xl">
                <Leaf className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold font-heading">Welcome Back</h1>
            <p className="text-xl text-white/90 max-w-md mx-auto font-light leading-relaxed">
              Sign in to continue your mission of transforming food waste into meals that matter.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-background">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors group z-20">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10 glass p-8 sm:p-12">
          <motion.div className="space-y-8">
            <div className="lg:hidden flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <Leaf className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">Sign In</h2>
              <p className="text-foreground/60 font-light">Welcome back to LastBite</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingInput icon={Mail} type="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <FloatingInput icon={Lock} type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary bg-transparent" />
                  <span className="text-foreground/60 group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Forgot password?
                </a>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold mt-4 transition-all"
              >
                Sign In
              </motion.button>
            </form>

            <div className="text-center text-sm pt-4 border-t border-border/50">
              <span className="text-foreground/60">Don't have an account? </span>
              <Link to="/signup" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                Create one now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}