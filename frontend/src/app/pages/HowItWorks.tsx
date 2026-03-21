import { motion } from 'motion/react';
import {
  Package, Users, MapPin, ArrowRight, Utensils, Building2, Bike,
  Clock, ShieldCheck, BarChart3, Heart, CheckCircle2, ChevronRight,
  Smartphone, Bell, Route
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const steps = [
  {
    number: '01',
    icon: Package,
    title: 'Post Surplus Food',
    description:
      'Restaurants list their surplus food with photos, quantity, dietary info, and a countdown timer before it expires.',
    details: [
      'Add food details in under 60 seconds',
      'Set pickup windows and expiry times',
      'Automatic notifications to nearby NGOs',
    ],
    image:
      'https://images.unsplash.com/photo-1758369636932-36fdcf1314fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwa2l0Y2hlbiUyMGNoZWYlMjBwcmVwYXJpbmclMjBmb29kfGVufDF8fHx8MTc3Mzk4Njc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-emerald-500/20 to-green-500/20',
  },
  {
    number: '02',
    icon: Users,
    title: 'NGO Claims Donation',
    description:
      'Nearby NGOs receive real-time alerts, browse available donations on an interactive map, and claim what they need.',
    details: [
      'Live map with nearby surplus food',
      'Filter by dietary type and quantity',
      'One-tap claim and scheduling',
    ],
    image:
      'https://images.unsplash.com/photo-1710092784814-4a6f158913b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXJzJTIwZm9vZCUyMGRvbmF0aW9uJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3Mzk4Njc4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    number: '03',
    icon: Bike,
    title: 'Volunteer Delivers',
    description:
      'Volunteers pick up optimized delivery tasks, follow guided routes, and confirm drop-offs — all tracked in real time.',
    details: [
      'Smart route optimization',
      'Real-time GPS tracking for all parties',
      'Photo confirmation on delivery',
    ],
    image:
      'https://images.unsplash.com/photo-1652862730746-93fcd0da61ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGVsaXZlcnklMjBwYWNrYWdlJTIwYm94fGVufDF8fHx8MTc3Mzk4Njc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'from-amber-500/20 to-orange-500/20',
  },
];

const roles = [
  {
    icon: Utensils,
    title: 'Restaurants',
    description: 'Post surplus food, track donations, and earn impact badges. Reduce waste while helping your community.',
    features: ['Quick food posting', 'Analytics dashboard', 'Impact certificates'],
  },
  {
    icon: Building2,
    title: 'NGOs',
    description: 'Discover nearby surplus food, claim donations, and coordinate pickups to serve those in need.',
    features: ['Real-time alerts', 'Interactive map', 'Pickup scheduling'],
  },
  {
    icon: Bike,
    title: 'Volunteers',
    description: 'Accept delivery tasks, follow optimized routes, and make a tangible difference — one delivery at a time.',
    features: ['Route optimization', 'Delivery tracking', 'Impact stats'],
  },
];

const platformFeatures = [
  { icon: Clock, title: 'Countdown Timers', description: 'Every donation has a live countdown so nothing goes to waste.' },
  { icon: MapPin, title: 'Interactive Map', description: 'See all active donations and deliveries on a real-time map.' },
  { icon: ShieldCheck, title: 'Verified Users', description: 'All restaurants and NGOs go through a verification process.' },
  { icon: BarChart3, title: 'Impact Analytics', description: 'Track meals saved, CO₂ reduced, and your community impact.' },
  { icon: Bell, title: 'Smart Notifications', description: 'Get alerted the moment surplus food is posted near you.' },
  { icon: Route, title: 'Optimized Routes', description: 'Volunteers get the fastest routes for efficient deliveries.' },
];

export function HowItWorks() {
  return (
    <div className="min-h-full text-foreground overflow-x-hidden">
      {/* Hero */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass !rounded-full text-foreground">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm">From surplus to sustenance in 3 simple steps</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              How <span className="text-primary">LastBite</span> Works
            </h1>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-3xl mx-auto font-light">
              We connect restaurants with surplus food to NGOs who need it, powered by a network of volunteer
              couriers — all coordinated through our real-time platform.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Steps — alternating layout */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <ImageWithFallback
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${step.color} mix-blend-multiply`} />
                  {/* Step badge */}
                  <div className="absolute top-6 left-6 w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/30">
                    {step.number}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/50 tracking-widest uppercase">Step {step.number}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{step.title}</h2>
                <p className="text-foreground/60 text-lg font-light leading-relaxed">{step.description}</p>
                <ul className="space-y-3">
                  {step.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-foreground/70">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Roles Section */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">A Role for Everyone</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
              Whether you run a restaurant, lead an NGO, or want to volunteer — there's a place for you on LastBite.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="glass p-8 flex flex-col items-center text-center group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <role.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-foreground/60 leading-relaxed mb-6 font-light">{role.description}</p>
                <ul className="space-y-2 w-full">
                  {role.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-foreground/70 text-sm">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Platform Features Grid */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Platform Features</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-light">
              Built with cutting-edge technology to make food rescue fast, transparent, and effortless.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass p-6 flex items-start gap-4 group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feat.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{feat.title}</h4>
                  <p className="text-foreground/60 text-sm font-light leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 sm:p-16 space-y-8"
          >
            <Smartphone className="w-12 h-12 text-primary mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to Rescue Food?
            </h2>
            <p className="text-foreground/60 text-lg font-light max-w-xl mx-auto">
              Join thousands of restaurants, NGOs, and volunteers who are already making an impact with LastBite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 glass text-foreground rounded-xl hover:border-primary/30 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
