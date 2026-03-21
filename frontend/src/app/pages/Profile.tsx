import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Camera, Settings, Bell, LogOut, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuthStore } from '../store/auth';

export function Profile() {
  const [activeTab, setActiveTab] = useState('activity');
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string>("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout: authLogout, role: authRole } = useAuthStore();

  const handleLogout = () => {
    authLogout();
    navigate('/');
  };

  const roleMatch = location.pathname.match(/\/(restaurant|ngo|volunteer)/);
  const role = roleMatch ? roleMatch[1] : (authRole || 'volunteer');

  const profileData = {
    restaurant: {
      name: 'Green Bistro',
      roleTitle: 'Restaurant Partner',
      email: 'hello@greenbistro.com',
      phone: '+1 (555) 987-6543',
      address: '123 Culinary Ave, Food District',
      stats: [
        { label: 'Meals Donated', value: '3,450', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Active Posts', value: '4', icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'CO2 Saved (kg)', value: '1,200', icon: Star, color: 'text-accent', bg: 'bg-accent/10' }
      ],
      activities: [
        { title: 'Posted 20 fresh sandwiches', time: '2 hours ago', icon: CheckCircle, color: 'text-primary' },
        { title: 'Donation picked up by Alex (Volunteer)', time: 'Yesterday', icon: User, color: 'text-accent' },
        { title: 'Reached 3,000 meals milestone', time: 'Last week', icon: Star, color: 'text-primary' }
      ]
    },
    ngo: {
      name: 'Hope Foundation',
      roleTitle: 'NGO Partner',
      email: 'contact@hopefoundation.org',
      phone: '+1 (555) 123-4567',
      address: '456 Charity Lane, Community Center',
      stats: [
        { label: 'Food Received', value: '12,500', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'People Fed', value: '8,400', icon: CheckCircle, color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Active Requests', value: '2', icon: Clock, color: 'text-accent', bg: 'bg-accent/10' }
      ],
      activities: [
        { title: 'Received 50 meals from Joe\'s Bakery', time: '2 hours ago', icon: CheckCircle, color: 'text-primary' },
        { title: 'Distributed food at Main Shelter', time: 'Yesterday', icon: MapPin, color: 'text-accent' },
        { title: 'Partnered with new restaurant', time: '3 days ago', icon: Star, color: 'text-primary' }
      ]
    },
    volunteer: {
      name: 'Alex Volunteer',
      roleTitle: 'Top Contributor',
      email: 'alex.volunteer@example.com',
      phone: '+1 (555) 555-5555',
      address: 'San Francisco, CA',
      stats: [
        { label: 'Meals Rescued', value: '1,245', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Hours Volunteered', value: '142', icon: Clock, color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Completed Deliveries', value: '89', icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10' }
      ],
      activities: [
        { title: 'Delivered 50 meals from Joe\'s Bakery to Hope Shelter', time: '2 hours ago', icon: CheckCircle, color: 'text-primary' },
        { title: 'Earned the "Speedy Deliverer" badge', time: 'Yesterday', icon: Star, color: 'text-accent' },
        { title: 'Completed first rescue of the month', time: '3 days ago', icon: CheckCircle, color: 'text-primary' }
      ]
    }
  };

  const data = profileData[role as keyof typeof profileData];

  const [editableData, setEditableData] = useState({
    name: profileData[role as keyof typeof profileData].name,
    email: profileData[role as keyof typeof profileData].email,
    phone: profileData[role as keyof typeof profileData].phone,
    address: profileData[role as keyof typeof profileData].address,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, you would save editableData to the backend here
    setIsEditing(false);
  };

  return (
    <div className="min-h-full text-foreground pb-20 pt-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-6 rounded-3xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
              
              <div className="relative mt-8 mb-4">
                <div className="w-32 h-32 mx-auto rounded-full p-1 bg-gradient-to-r from-primary to-secondary relative group">
                  <ImageWithFallback
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-background"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </div>
              </div>

              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold font-heading mb-1">{editableData.name}</h2>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                    <Star className="w-4 h-4 fill-primary" /> {data.roleTitle}
                  </div>
                  
                  <div className="space-y-4 text-left border-t border-border/50 pt-6">
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <Mail className="w-4 h-4 text-foreground/40 shrink-0" />
                      {editableData.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <Phone className="w-4 h-4 text-foreground/40 shrink-0" />
                      {editableData.phone}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <MapPin className="w-4 h-4 text-foreground/40 shrink-0" />
                      {editableData.address}
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-6 w-full py-2 px-4 rounded-xl border border-primary text-primary hover:bg-primary/10 transition-colors font-medium text-sm"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <div className="space-y-4 text-left mt-6">
                  <div>
                    <label className="text-xs text-foreground/60 mb-1 block">Full Name</label>
                    <input 
                      type="text" 
                      value={editableData.name} 
                      onChange={e => setEditableData({...editableData, name: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground/60 mb-1 block">Email</label>
                    <input 
                      type="email" 
                      value={editableData.email} 
                      onChange={e => setEditableData({...editableData, email: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground/60 mb-1 block">Phone</label>
                    <input 
                      type="text" 
                      value={editableData.phone} 
                      onChange={e => setEditableData({...editableData, phone: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-foreground/60 mb-1 block">Address</label>
                    <input 
                      type="text" 
                      value={editableData.address} 
                      onChange={e => setEditableData({...editableData, address: e.target.value})}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex gap-2 mt-4 pt-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2 px-4 rounded-xl border border-border text-foreground hover:bg-border/50 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="flex-1 py-2 px-4 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors font-medium text-sm shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Settings Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-6 rounded-3xl space-y-2"
            >
              <h3 className="font-heading font-semibold text-sm text-foreground/50 uppercase tracking-wider mb-4">Settings</h3>
              
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-foreground/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-foreground/60" />
                  <span className="text-sm font-medium">Notifications</span>
                </div>
                <div className="w-10 h-5 bg-primary rounded-full relative">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-foreground/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-foreground/60" />
                  <span className="text-sm font-medium">Account Preferences</span>
                </div>
              </div>

              <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-destructive/10 text-destructive transition-colors mt-4">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </motion.div>
          </div>

          {/* Right Content - Activity & Stats */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass p-6 rounded-3xl flex items-center gap-4 hover:scale-[1.02] transition-transform"
                >
                  <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-heading">{stat.value}</div>
                    <div className="text-sm text-foreground/60">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Tabs Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-3xl overflow-hidden"
            >
              <div className="flex border-b border-border/50 px-6">
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'activity' ? 'text-primary' : 'text-foreground/60 hover:text-foreground'}`}
                  onClick={() => setActiveTab('activity')}
                >
                  Recent Activity
                  {activeTab === 'activity' && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === 'badges' ? 'text-primary' : 'text-foreground/60 hover:text-foreground'}`}
                  onClick={() => setActiveTab('badges')}
                >
                  Badges & Achievements
                  {activeTab === 'badges' && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              </div>

              <div className="p-6">
                {activeTab === 'activity' && (
                  <div className="space-y-6">
                    {data.activities.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center z-10 ${item.color}`}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          {i !== 2 && <div className="absolute top-10 bottom-[-24px] w-0.5 bg-border/50" />}
                        </div>
                        <div className="pt-2">
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-sm text-foreground/50">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'badges' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { name: 'First Rescue', icon: Star },
                      { name: '100 Meals', icon: TrendingUp },
                      { name: 'Speedy', icon: Clock },
                      { name: 'Eco Warrior', icon: User }
                    ].map((badge, i) => (
                      <div key={i} className="p-4 border border-border/50 rounded-2xl flex flex-col items-center text-center gap-2 hover:bg-primary/5 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center text-primary">
                          <badge.icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}