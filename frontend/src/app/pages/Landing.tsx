import { motion } from 'motion/react';
import { ArrowRight, Leaf, Users, TrendingUp, Heart, Star, MapPin, Clock, Package, Activity, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Landing() {
  return (
    <div className="min-h-full text-foreground overflow-x-hidden">
      <HeroSection />
      
      {/* Subtle Divider */}
      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <HowItWorks />
      
      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <FeaturesSection />
      
      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <ImpactSection />
      
      <div className="h-px w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <TestimonialsSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* High-quality food background image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1763570645098-371723617ee9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGhlYWx0aHklMjBmb29kJTIwc2hhcmluZyUyMGNvbW11bml0eSUyMG1lYWx8ZW58MXx8fHwxNzczOTg2NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Food sharing background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 dark:from-background/95 dark:via-background/85 dark:to-background/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass !rounded-full text-foreground"
          >
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium">Reducing Food Waste, One Meal at a Time</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
            <span className="block text-foreground">From Waste</span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent pb-2">
              to Worth
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-xl mx-auto md:mx-0 text-lg sm:text-xl text-foreground/80 leading-relaxed font-light">
            LastBite connects restaurants, NGOs, and volunteers to rescue surplus food
            and deliver it efficiently to those who need it most. Join the sustainable food ecosystem today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-2xl font-medium flex items-center gap-2 shadow-[0_8px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_8px_40px_rgba(34,197,94,0.5)] transition-all"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-foreground font-medium flex items-center gap-2"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="flex-1 relative w-full aspect-[4/3] md:aspect-square lg:h-[600px] rounded-[32px] overflow-hidden shadow-2xl dark:shadow-primary/10"
        >
          {/* Slow zoom on image */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1593079323074-f1d77349c998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZvb2QlMjBzaGFyaW5nJTIwY29tbXVuaXR5fGVufDF8fHx8MTc3MzkxOTE2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Community sharing food sustainably"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Soft Green Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-black/10 mix-blend-overlay dark:mix-blend-color" />
          
          {/* Depth / Border effect inside image container */}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[32px]" />
          
          {/* Glass floating element on the image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 glass p-4 !rounded-2xl flex items-center gap-4 border border-white/30 backdrop-blur-2xl"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-primary fill-primary/20" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">Community Support</div>
              <div className="text-xs text-foreground/80">Connecting people through sharing</div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: Package,
      title: 'Post Surplus',
      description: 'Restaurants post available surplus food with details and expiry time',
    },
    {
      icon: Users,
      title: 'NGO Requests',
      description: 'NGOs browse nearby donations and request pickup for distribution',
    },
    {
      icon: MapPin,
      title: 'Volunteer Delivers',
      description: 'Volunteers accept tasks and deliver food from restaurants to NGOs',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
            A simple three-step process to transform surplus food into meals for those in need
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative group"
            >
              <div className="glass p-8 h-full flex flex-col items-center text-center relative z-10">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20 ring-4 ring-background">
                  {index + 1}
                </div>

                {/* Glass Icon Circle */}
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed font-light">{step.description}</p>
              </div>

              {/* Connecting Arrow (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform translate-x-full -translate-y-1/2 z-0">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Activity,
      title: 'Real-time Tracking',
      description: 'Follow every delivery step-by-step with interactive live maps.',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Partners',
      description: 'Every NGO and restaurant is verified for food safety and quality.',
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Get notified immediately when surplus food matches your criteria.',
    },
    {
      icon: Leaf,
      title: 'Impact Reports',
      description: 'Track your CO2 savings and meal contributions seamlessly.',
    }
  ];

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle green glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Core Features</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
            Powerful tools designed to make food rescue fast, safe, and transparent.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="glass p-6 h-full flex flex-col items-start group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed font-light">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
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
    const duration = 2500;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Use easing function for smoother counter
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounters({
        meals: Math.floor(targets.meals * easeOutQuart),
        deliveries: Math.floor(targets.deliveries * easeOutQuart),
        volunteers: Math.floor(targets.volunteers * easeOutQuart),
        co2: parseFloat((targets.co2 * easeOutQuart).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="impact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Background glow for impact section */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Impact</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
            Together, we're making a measurable difference in reducing food waste.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Heart, label: 'Meals Saved', value: counters.meals.toLocaleString() },
            { icon: TrendingUp, label: 'Deliveries', value: counters.deliveries.toLocaleString() },
            { icon: Users, label: 'Volunteers', value: counters.volunteers.toLocaleString() },
            { icon: Leaf, label: 'CO₂ Saved (Tons)', value: counters.co2.toFixed(1) },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="glass p-8 text-center flex flex-col items-center justify-center group"
            >
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent mb-4 tracking-tighter">
                {stat.value}
              </div>
              <div className="flex items-center gap-2 text-foreground/80 font-medium uppercase tracking-wider text-sm">
                <stat.icon className="w-4 h-4 text-primary" />
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Restaurant Owner',
      content: 'LastBite has completely changed our end-of-day routine. We no longer throw away perfectly good food, and we feel great giving back to the community!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'NGO Director',
      content: 'The platform makes it incredibly easy to coordinate food pickups. The real-time tracking gives us peace of mind that meals arrive safely.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Emma Davis',
      role: 'Volunteer',
      content: 'Being able to contribute to reducing food waste on my own schedule is amazing. The app is super intuitive and makes volunteering fun.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Community Voices</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto font-light">
            Hear directly from the people who make LastBite possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="glass p-8 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/80 mb-8 font-light italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-foreground/60">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}