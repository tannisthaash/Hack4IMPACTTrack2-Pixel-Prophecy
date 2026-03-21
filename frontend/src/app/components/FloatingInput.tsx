import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function FloatingInput({ icon: Icon, type, label, value, onChange }: { icon: any, type: string, label: string, value: string, onChange: (e: any) => void }) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const active = focused || value.length > 0;
  
  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="relative group">
      <Icon className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 z-10 ${active ? 'text-primary' : 'text-foreground/40'}`} />
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full pl-12 ${type === 'password' ? 'pr-12' : 'pr-4'} pt-6 pb-2 bg-input-background text-input-foreground placeholder:text-input-placeholder border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all caret-foreground dark:caret-white`}
        required
      />
      <label className={`absolute left-12 transition-all duration-300 pointer-events-none ${active ? 'top-2 text-xs text-primary' : 'top-1/2 -translate-y-1/2 text-sm text-foreground/50'}`}>
        {label}
      </label>
      
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors z-10"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}

      {/* Focus glow */}
      <div className={`absolute -bottom-px left-12 right-4 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 transition-opacity duration-300 ${focused ? 'opacity-100' : ''}`} />
    </div>
  );
}
