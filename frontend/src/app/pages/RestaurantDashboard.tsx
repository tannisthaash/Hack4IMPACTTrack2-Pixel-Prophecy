import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Plus, MapPin, Clock, Package, ChevronLeft, ChevronRight, Map } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';
import { StatusBadge } from '../components/StatusBadge';

interface FoodListing {
  id: string;
  name: string;
  quantity: string;
  location: string;
  expiryTime: Date;
  status: 'posted' | 'accepted' | 'delivered';
  imageUrl?: string;
}

export function RestaurantDashboard() {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [listings, setListings] = useState<FoodListing[]>([
    {
      id: '1',
      name: 'Fresh Vegetable Mix',
      quantity: '15 portions',
      location: 'Main Kitchen, Downtown',
      expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      status: 'posted',
    },
    {
      id: '2',
      name: 'Prepared Sandwiches',
      quantity: '25 units',
      location: 'Main Kitchen, Downtown',
      expiryTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000), // 1.5 hours from now
      status: 'accepted',
    },
    {
      id: '3',
      name: 'Bakery Items',
      quantity: '40 pieces',
      location: 'Main Kitchen, Downtown',
      expiryTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      status: 'posted',
    },
    {
      id: '4',
      name: 'Cooked Rice & Curry',
      quantity: '30 portions',
      location: 'Main Kitchen, Downtown',
      expiryTime: new Date(Date.now() - 0.5 * 60 * 60 * 1000), // Expired
      status: 'delivered',
    },
  ]);

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
                Restaurant Dashboard
              </motion.h1>
              <p className="text-foreground/60">Manage your surplus food listings</p>
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/restaurant/map')}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium shadow-lg shadow-secondary/20 hover:shadow-xl transition-all"
            >
              <Map className="w-5 h-5" />
              View Map
            </motion.button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Active Listings', value: '3', icon: Package, color: 'from-primary to-secondary' },
              { label: 'Total Saved', value: '247', icon: Clock, color: 'from-secondary to-accent' },
              { label: 'This Month', value: '42', icon: MapPin, color: 'from-accent to-primary' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-2xl hover:shadow-lg hover:shadow-primary/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Food Button */}
          <motion.button
            onClick={() => setShowAddForm(!showAddForm)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-8 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Surplus Food
          </motion.button>

          {/* Add Food Form */}
          {showAddForm && (
            <AddFoodForm 
              onClose={() => setShowAddForm(false)} 
              onAdd={(newFood) => {
                setListings([newFood, ...listings]);
                setShowAddForm(false);
              }}
            />
          )}

          {/* Food Listings */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing, index) => (
                <FoodCard key={listing.id} listing={listing} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddFoodForm({ 
  onClose,
  onAdd
}: { 
  onClose: () => void;
  onAdd: (listing: FoodListing) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    location: '',
    expiryHours: '4',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newListing: FoodListing = {
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      quantity: formData.quantity,
      location: formData.location,
      expiryTime: new Date(Date.now() + parseInt(formData.expiryHours) * 60 * 60 * 1000),
      status: 'posted',
    };

    onAdd(newListing);
    import('sonner').then(({ toast }) => toast.success("Food added successfully"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="glass p-8 rounded-2xl mb-8"
    >
      <h3 className="text-2xl font-bold mb-6">Add Surplus Food</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Food Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Fresh Vegetables"
              className="w-full px-4 py-3 bg-input-background text-input-foreground placeholder:text-input-placeholder border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="text"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="e.g., 20 portions"
              className="w-full px-4 py-3 bg-input-background text-input-foreground placeholder:text-input-placeholder border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter address"
                className="w-full pl-12 pr-4 py-3 bg-input-background text-input-foreground placeholder:text-input-placeholder border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>

          {/* Expiry Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Valid For (hours)</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="number"
                value={formData.expiryHours}
                onChange={(e) => setFormData({ ...formData, expiryHours: e.target.value })}
                min="1"
                max="24"
                className="w-full pl-12 pr-4 py-3 bg-input-background text-input-foreground placeholder:text-input-placeholder border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
          >
            Post Listing
          </motion.button>
          <motion.button
            type="button"
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 glass rounded-xl font-medium"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

function FoodCard({ listing, index }: { listing: FoodListing; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.15)' }}
      className="glass p-6 rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{listing.name}</h3>
          <p className="text-sm text-foreground/60">{listing.quantity}</p>
        </div>
        <CountdownTimer expiryTime={listing.expiryTime} size="sm" />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{listing.location}</span>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <StatusBadge status={listing.status} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-primary hover:underline"
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}