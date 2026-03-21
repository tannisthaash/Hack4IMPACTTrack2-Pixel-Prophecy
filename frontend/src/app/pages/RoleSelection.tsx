import { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Building, Users as UsersIcon, Bike, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../store/auth';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type UserRole = 'restaurant' | 'ngo' | 'volunteer';

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();
  const { login, isAuthenticated, setRole } = useAuthStore();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (isAuthenticated) {
      setRole(role);
    } else {
      login(role);
    }
    setTimeout(() => {
      navigate(`/${role}/dashboard`);
    }, 500);
  };

  const roles = [
    {
      id: 'restaurant' as UserRole,
      icon: Building,
      title: 'Restaurant / Donor',
      description: 'Post surplus food and reduce waste',
      gradient: 'from-primary to-secondary',
    },
    {
      id: 'ngo' as UserRole,
      icon: UsersIcon,
      title: 'NGO / Receiver',
      description: 'Request food pickups for distribution',
      gradient: 'from-secondary to-accent',
    },
    {
      id: 'volunteer' as UserRole,
      icon: Bike,
      title: 'Volunteer Driver',
      description: 'Deliver food and make a direct impact',
      gradient: 'from-accent to-primary',
    },
  ];

  return (
    <div className="min-h-full flex text-foreground selection:bg-primary/30 bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1609139027234-57570f43f692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMHZvbHVudGVlcmluZyUyMGZvb2QlMjBiYW5rfGVufDF8fHx8MTc3Mzk4NzE1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Volunteers at food bank"
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
            <h1 className="text-5xl font-bold font-heading">Choose Your Role</h1>
            <p className="text-xl text-white/90 max-w-md mx-auto font-light leading-relaxed">
              Select how you want to interact with the platform.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <Link to="/signup" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors group z-20">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
        </Link>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10 glass p-8 sm:p-12">
          <motion.div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-heading mb-2 bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70 bg-clip-text text-transparent">Choose Your Role</h2>
              <p className="text-foreground/60 font-light">Select how you'd like to contribute</p>
            </div>

            <div className="space-y-4">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-5 rounded-2xl border transition-all text-left group ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                      : 'border-border/50 bg-background/50 hover:border-primary/50 hover:bg-background/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{role.title}</h3>
                      <p className="text-sm text-foreground/60 font-light">{role.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}