import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Package, CheckCircle, Clock, Award, Map } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';

interface DeliveryTask {
  id: string;
  foodName: string;
  quantity: string;
  pickupLocation: string;
  dropLocation: string;
  urgency: 'high' | 'medium' | 'low';
  status: 'pending' | 'accepted' | 'picked-up' | 'delivered';
  estimatedTime: string;
}

type TaskStatus = 'pending' | 'accepted' | 'picked-up' | 'delivered';

export function VolunteerDashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<DeliveryTask[]>([
    {
      id: '1',
      foodName: 'Fresh Vegetable Mix',
      quantity: '15 portions',
      pickupLocation: 'Green Bistro, 123 Main St',
      dropLocation: 'Hope Foundation, 456 Oak Ave',
      urgency: 'high',
      status: 'pending',
      estimatedTime: '20 min',
    },
    {
      id: '2',
      foodName: 'Prepared Sandwiches',
      quantity: '25 units',
      pickupLocation: 'Urban Kitchen, 456 Oak Ave',
      dropLocation: 'Care Center, 789 Pine Rd',
      urgency: 'medium',
      status: 'accepted',
      estimatedTime: '30 min',
    },
    {
      id: '3',
      foodName: 'Bakery Items',
      quantity: '40 pieces',
      pickupLocation: 'Artisan Bakery, 789 Pine Rd',
      dropLocation: 'Community Hub, 321 Elm St',
      urgency: 'low',
      status: 'pending',
      estimatedTime: '45 min',
    },
  ]);

  const [stats] = useState({
    totalDeliveries: 47,
    thisWeek: 8,
    points: 940,
    badges: 5,
  });

  const handleAcceptTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'accepted' as TaskStatus } : task
    ));
  };

  const handleProgressTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const statusFlow: Record<TaskStatus, TaskStatus> = {
          pending: 'accepted',
          accepted: 'picked-up',
          'picked-up': 'delivered',
          delivered: 'delivered',
        };
        return { ...task, status: statusFlow[task.status] };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-full bg-background/0">
      
      <div className="px-4 sm:px-6 lg:px-8 pb-12 pt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-2"
              >
                Volunteer Dashboard
              </motion.h1>
              <p className="text-foreground/60">Accept and complete delivery tasks</p>
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/volunteer/map')}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium shadow-lg shadow-secondary/20 hover:shadow-xl transition-all"
            >
              <Map className="w-5 h-5" />
              View Map
            </motion.button>
          </div>

          {/* Stats & Gamification */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Deliveries', value: stats.totalDeliveries, icon: Package, color: 'from-primary to-secondary' },
              { label: 'This Week', value: stats.thisWeek, icon: Clock, color: 'from-secondary to-accent' },
              { label: 'Points Earned', value: stats.points, icon: Award, color: 'from-accent to-primary' },
              { label: 'Badges', value: stats.badges, icon: Award, color: 'from-primary to-accent' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-foreground/60">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Achievement Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-2xl mb-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shrink-0">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">3 more deliveries to Gold Badge! 🏆</h3>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
                  />
                </div>
                <p className="text-sm text-foreground/60">Keep up the great work!</p>
              </div>
            </div>
          </motion.div>

          {/* Task Filters */}
          <div className="flex gap-3 mb-6">
            {[
              { label: 'Available', count: tasks.filter(t => t.status === 'pending').length },
              { label: 'In Progress', count: tasks.filter(t => t.status === 'accepted' || t.status === 'picked-up').length },
              { label: 'Completed', count: tasks.filter(t => t.status === 'delivered').length },
            ].map((tab) => (
              <motion.button
                key={tab.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 glass rounded-xl font-medium hover:border-primary/50 transition-all"
              >
                {tab.label} <span className="ml-2 text-primary">{tab.count}</span>
              </motion.button>
            ))}
          </div>

          {/* Task Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Delivery Tasks</h2>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  onAccept={handleAcceptTask}
                  onProgress={handleProgressTask}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ 
  task, 
  index, 
  onAccept,
  onProgress 
}: { 
  task: DeliveryTask; 
  index: number;
  onAccept: (id: string) => void;
  onProgress: (id: string) => void;
}) {
  const urgencyConfig = {
    high: { color: 'text-red-500', bg: 'bg-red-500/10', label: 'High Priority' },
    medium: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Medium Priority' },
    low: { color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Low Priority' },
  };

  const { color, bg, label } = urgencyConfig[task.urgency];

  const progressSteps = [
    { id: 'accepted', label: 'Accepted', icon: CheckCircle },
    { id: 'picked-up', label: 'Picked Up', icon: Package },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = progressSteps.findIndex(step => step.id === task.status);
  const showProgress = task.status !== 'pending';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)' }}
      className="glass p-6 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{task.foodName}</h3>
          <p className="text-sm text-foreground/60">{task.quantity}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 ${bg} ${color} rounded-full text-xs font-medium`}>
            {label}
          </span>
          <StatusBadge status={task.status} />
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Pickup</p>
            <p className="font-medium">{task.pickupLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-4">
          <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-secondary" />
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-foreground/60">Drop-off</p>
            <p className="font-medium">{task.dropLocation}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60 pt-2">
          <Clock className="w-4 h-4" />
          <span>Estimated time: {task.estimatedTime}</span>
        </div>
      </div>

      {/* Progress Tracker (shown when task is accepted) */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {progressSteps.map((step, idx) => {
              const isActive = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: isActive ? 1 : 0.8 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? 'bg-gradient-to-br from-primary to-secondary'
                          : 'bg-muted'
                      }`}
                    >
                      <step.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-foreground/40'}`} />
                    </motion.div>
                    <span className={`text-xs mt-2 ${isActive ? 'text-foreground' : 'text-foreground/40'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < progressSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${isActive ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-muted'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Button */}
      {task.status === 'pending' && (
        <motion.button
          onClick={() => onAccept(task.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
        >
          Accept Task
        </motion.button>
      )}

      {task.status !== 'pending' && task.status !== 'delivered' && (
        <motion.button
          onClick={() => onProgress(task.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-secondary to-accent text-white rounded-xl font-medium shadow-lg shadow-secondary/30 hover:shadow-xl hover:shadow-secondary/40 transition-all"
        >
          {task.status === 'accepted' ? 'Mark as Picked Up' : 'Mark as Delivered'}
        </motion.button>
      )}

      {task.status === 'delivered' && (
        <div className="w-full py-3 bg-primary/10 text-primary rounded-xl font-medium text-center">
          Completed ✓
        </div>
      )}
    </motion.div>
  );
}