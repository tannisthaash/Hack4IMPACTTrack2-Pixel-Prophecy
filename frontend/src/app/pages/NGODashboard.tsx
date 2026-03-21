import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Navigation, Filter, TrendingUp, Map } from 'lucide-react';
import { CountdownTimer } from '../components/CountdownTimer';

interface FoodDonation {
  id: string;
  restaurantName: string;
  foodName: string;
  quantity: string;
  distance: string;
  location: string;
  expiryTime: Date;
  freshness: 'high' | 'medium' | 'low';
}

export function NGODashboard() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nearby' | 'fresh'>('all');
  const [donations] = useState<FoodDonation[]>([
    {
      id: '1',
      restaurantName: 'Green Bistro',
      foodName: 'Fresh Vegetable Mix',
      quantity: '15 portions',
      distance: '0.8 km',
      location: '123 Main St, Downtown',
      expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      freshness: 'high',
    },
    {
      id: '2',
      restaurantName: 'Urban Kitchen',
      foodName: 'Prepared Sandwiches',
      quantity: '25 units',
      distance: '1.2 km',
      location: '456 Oak Ave, Midtown',
      expiryTime: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
      freshness: 'medium',
    },
    {
      id: '3',
      restaurantName: 'Artisan Bakery',
      foodName: 'Assorted Bakery Items',
      quantity: '40 pieces',
      distance: '2.5 km',
      location: '789 Pine Rd, Uptown',
      expiryTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      freshness: 'high',
    },
    {
      id: '4',
      restaurantName: 'Spice House',
      foodName: 'Cooked Rice & Curry',
      quantity: '30 portions',
      distance: '0.5 km',
      location: '321 Elm St, Downtown',
      expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      freshness: 'high',
    },
  ]);

  const filteredDonations = donations.filter((donation) => {
    if (selectedFilter === 'nearby') {
      return parseFloat(donation.distance) <= 1.5;
    }
    if (selectedFilter === 'fresh') {
      return donation.freshness === 'high';
    }
    return true;
  });

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
                NGO Dashboard
              </motion.h1>
              <p className="text-foreground/60">Browse and request nearby food donations</p>
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/ngo/map')}
              className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium shadow-lg shadow-secondary/20 hover:shadow-xl transition-all"
            >
              <Map className="w-5 h-5" />
              View Map
            </motion.button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Available Now', value: '12', icon: MapPin, color: 'from-primary to-secondary' },
              { label: 'Requested', value: '5', icon: TrendingUp, color: 'from-secondary to-accent' },
              { label: 'This Week', value: '34', icon: Navigation, color: 'from-accent to-primary' },
              { label: 'Total Saved', value: '428', icon: TrendingUp, color: 'from-primary to-secondary' },
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
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-foreground/60">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            {[
              { id: 'all', label: 'All Donations' },
              { id: 'nearby', label: 'Nearby (<1.5 km)' },
              { id: 'fresh', label: 'High Freshness' },
            ].map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as typeof selectedFilter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30'
                    : 'glass hover:border-primary/50'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Donation Cards */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              Available Donations ({filteredDonations.length})
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDonations.map((donation, index) => (
                <DonationCard key={donation.id} donation={donation} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DonationCard({ donation, index }: { donation: FoodDonation; index: number }) {
  const [requested, setRequested] = useState(false);

  const freshnessConfig = {
    high: { label: 'High', color: 'text-primary', bg: 'bg-primary/10' },
    medium: { label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    low: { label: 'Low', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  };

  const { label, color, bg } = freshnessConfig[donation.freshness];

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
          <h3 className="text-xl font-semibold mb-1">{donation.foodName}</h3>
          <p className="text-sm text-foreground/60">{donation.restaurantName}</p>
        </div>
        <CountdownTimer expiryTime={donation.expiryTime} size="sm" />
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-foreground/60">Quantity:</span>
          <span className="font-medium">{donation.quantity}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-foreground/60" />
          <span className="text-foreground/80">{donation.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Navigation className="w-4 h-4 text-foreground/60" />
          <span className="font-medium text-primary">{donation.distance} away</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-foreground/60">Freshness:</span>
          <span className={`px-3 py-1 ${bg} ${color} rounded-full text-xs font-medium`}>
            {label}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        onClick={() => setRequested(true)}
        disabled={requested}
        whileHover={{ scale: requested ? 1 : 1.02 }}
        whileTap={{ scale: requested ? 1 : 0.98 }}
        className={`w-full py-3 rounded-xl font-medium transition-all ${
          requested
            ? 'bg-muted text-foreground/60 cursor-not-allowed'
            : 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
        }`}
      >
        {requested ? 'Pickup Requested ✓' : 'Request Pickup'}
      </motion.button>
    </motion.div>
  );
}