import { motion } from 'motion/react';
import { Heart, TrendingUp, Users, Leaf, Package, MapPin } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

export function ImpactDashboard() {
  const [counters, setCounters] = useState({
    meals: 0,
    deliveries: 0,
    volunteers: 0,
    co2: 0,
  });

  const targets = {
    meals: 52340,
    deliveries: 8456,
    volunteers: 1234,
    co2: 45.6,
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        meals: Math.floor(targets.meals * progress),
        deliveries: Math.floor(targets.deliveries * progress),
        volunteers: Math.floor(targets.volunteers * progress),
        co2: parseFloat((targets.co2 * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const weeklyData = [
    { day: 'Mon', meals: 420, deliveries: 68 },
    { day: 'Tue', meals: 380, deliveries: 62 },
    { day: 'Wed', meals: 510, deliveries: 84 },
    { day: 'Thu', meals: 450, deliveries: 73 },
    { day: 'Fri', meals: 620, deliveries: 102 },
    { day: 'Sat', meals: 780, deliveries: 128 },
    { day: 'Sun', meals: 540, deliveries: 89 },
  ];

  const monthlyData = [
    { month: 'Jan', meals: 12400 },
    { month: 'Feb', meals: 14200 },
    { month: 'Mar', meals: 16800 },
    { month: 'Apr', meals: 15600 },
    { month: 'May', meals: 18200 },
    { month: 'Jun', meals: 19400 },
  ];

  return (
    <div className="min-h-full">
      
      <div className="px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2"
            >
              Impact Dashboard
            </motion.h1>
            <p className="text-foreground/60">Tracking our collective impact on food waste and communities</p>
          </div>

          {/* Main KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { 
                icon: Heart, 
                label: 'Meals Saved', 
                value: counters.meals.toLocaleString(), 
                suffix: '', 
                color: 'from-primary to-secondary',
                description: 'Total meals rescued'
              },
              { 
                icon: TrendingUp, 
                label: 'Deliveries', 
                value: counters.deliveries.toLocaleString(), 
                suffix: '', 
                color: 'from-secondary to-accent',
                description: 'Successful deliveries'
              },
              { 
                icon: Users, 
                label: 'Active Volunteers', 
                value: counters.volunteers.toLocaleString(), 
                suffix: '', 
                color: 'from-accent to-primary',
                description: 'Contributing members'
              },
              { 
                icon: Leaf, 
                label: 'CO₂ Saved', 
                value: counters.co2.toFixed(1), 
                suffix: ' tons', 
                color: 'from-primary to-accent',
                description: 'Environmental impact'
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)' }}
                className="glass p-6 rounded-2xl"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-foreground/60">{stat.description}</div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Weekly Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="rgba(128,128,128,0.5)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(128,128,128,0.5)"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '12px',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="meals" 
                    stroke="#22C55E" 
                    strokeWidth={3}
                    dot={{ fill: '#22C55E', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Monthly Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-6">Monthly Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(128,128,128,0.5)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(128,128,128,0.5)"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '12px',
                      color: 'var(--foreground)'
                    }}
                  />
                  <Bar 
                    dataKey="meals" 
                    fill="#22C55E" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Package, label: 'Restaurants', value: '245', change: '+12', color: 'from-primary to-secondary' },
              { icon: Users, label: 'NGO Partners', value: '89', change: '+5', color: 'from-secondary to-accent' },
              { icon: MapPin, label: 'Cities', value: '32', change: '+3', color: 'from-accent to-primary' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-foreground/60">{stat.label}</span>
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </div>
                  <div className="text-primary text-sm font-medium">
                    {stat.change} this month
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Impact Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
          >
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Making a Real Difference</h3>
              <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                Through the collective efforts of our restaurants, NGO partners, and dedicated volunteers, 
                we've successfully rescued over <span className="font-bold text-primary">52,000 meals</span> and 
                prevented <span className="font-bold text-primary">45.6 tons of CO₂</span> emissions. 
                Together, we're building a sustainable future while fighting food insecurity.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 glass rounded-xl">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-foreground/60">Carbon Neutral</div>
                </div>
                <div className="px-6 py-3 glass rounded-xl">
                  <div className="text-2xl font-bold text-secondary">24/7</div>
                  <div className="text-sm text-foreground/60">Active Platform</div>
                </div>
                <div className="px-6 py-3 glass rounded-xl">
                  <div className="text-2xl font-bold text-accent">0</div>
                  <div className="text-sm text-foreground/60">Food Wasted</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}