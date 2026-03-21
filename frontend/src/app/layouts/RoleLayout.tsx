import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { MapView } from '../pages/MapView';

export function RoleLayout() {
  const location = useLocation();
  const isMap = location.pathname.endsWith('/map');

  return (
    <div className="relative w-full flex-1 flex flex-col">
      {isMap ? (
        <div className="flex-1 w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 160px)' }}>
          <MapView />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 w-full flex-1 flex flex-col pb-20"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
