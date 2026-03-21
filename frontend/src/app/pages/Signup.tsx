import { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { FloatingInput } from '../components/FloatingInput';
import { useAuthStore } from '../store/auth';

export function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-set user info (role will be set in RoleSelection)
    useAuthStore.getState().login(null, name, email);
    navigate('/role-selection');
  };

  return (
    <div className="min-h-full flex text-foreground selection:bg-primary/30">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent p-12 items-center justify-center relative overflow-hidden">
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
          <h1 className="text-5xl font-bold font-heading">Join LastBite</h1>
          <p className="text-xl text-white/90 max-w-md mx-auto font-light leading-relaxed">
            Create an account to join our mission against food waste.
          </p>
          
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-40 h-40 bg-white/10 rounded-full blur-3xl mix-blend-overlay"
                animate={{
                  x: [0, 150, 0],
                  y: [0, -150, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 12 + i * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 2,
                }}
                style={{
                  left: `${10 + i * 25}%`,
                  top: `${10 + i * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
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
              <h2 className="text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">Create Account</h2>
              <p className="text-foreground/60 font-light">Join us in the fight against food waste</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <FloatingInput icon={User} type="text" label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <FloatingInput icon={Mail} type="email" label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <FloatingInput icon={Lock} type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold mt-4 transition-all"
              >
                Continue
              </motion.button>
            </form>

            <div className="text-center text-sm pt-4 border-t border-border/50">
              <span className="text-foreground/60">Already have an account? </span>
              <Link to="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}