import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CountdownTimerProps {
  expiryTime: Date;
  size?: 'sm' | 'md' | 'lg';
}

export function CountdownTimer({ expiryTime, size = 'md' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(expiryTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTime]);

  const percentage = Math.max(0, Math.min(100, (timeLeft.total / (4 * 60 * 60 * 1000)) * 100)); // Assume 4 hours initial time
  const status = percentage > 50 ? 'fresh' : percentage > 20 ? 'urgent' : 'expired';

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const radius = size === 'sm' ? 28 : size === 'md' ? 42 : 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    fresh: { stroke: '#22C55E', glow: 'rgba(34, 197, 94, 0.3)' },
    urgent: { stroke: '#eab308', glow: 'rgba(234, 179, 8, 0.3)' },
    expired: { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)' },
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className={`${sizeClasses[size]} transform -rotate-90`}>
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={colors[status].stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            filter: status === 'urgent' || status === 'expired' ? `drop-shadow(0 0 8px ${colors[status].glow})` : 'none',
          }}
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${textSizeClasses[size]}`}>
        <div className="font-bold">
          {timeLeft.hours}:{String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <div className="text-[0.65em] text-foreground/60">
          {timeLeft.total <= 0 ? 'Expired' : 'left'}
        </div>
      </div>
    </div>
  );
}

function getTimeLeft(expiryTime: Date) {
  const total = expiryTime.getTime() - Date.now();
  
  if (total <= 0) {
    return { total: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return { total, hours, minutes, seconds };
}
