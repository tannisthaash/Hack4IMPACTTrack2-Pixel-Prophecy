import { motion } from 'motion/react';

type Status = 'posted' | 'accepted' | 'delivered' | 'picked-up' | 'pending' | 'active' | 'completed';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = {
    posted: { label: 'Posted', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    accepted: { label: 'Accepted', color: 'bg-accent/10 text-accent border-accent/20' },
    delivered: { label: 'Delivered', color: 'bg-primary/10 text-primary border-primary/20' },
    'picked-up': { label: 'Picked Up', color: 'bg-secondary/10 text-secondary border-secondary/20' },
    pending: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    active: { label: 'Active', color: 'bg-primary/10 text-primary border-primary/20' },
    completed: { label: 'Completed', color: 'bg-gray-500/10 text-gray-500 border-gray-500/20' },
  };

  const { label, color } = config[status];

  return (
    <motion.span
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium ${color} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
      {label}
    </motion.span>
  );
}
