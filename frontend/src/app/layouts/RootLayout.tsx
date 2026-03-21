import { useLocation, Outlet } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function RootLayout() {
  const location = useLocation();
  const isRoleRoute = location.pathname.match(/\/(restaurant|ngo|volunteer)/);

  return (
    <div className="page-container relative min-h-screen w-full bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main content area - full width */}
      {isRoleRoute ? (
        <main className="content flex-1 flex flex-col w-full relative">
          <Outlet />
        </main>
      ) : (
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="content flex-1 flex flex-col w-full relative"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      )}

      {/* Footer */}
      <div className="relative z-10 shrink-0">
        <Footer />
      </div>
    </div>
  );
}
