import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, Leaf, TrendingUp } from 'lucide-react';

export default function Hero3DSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content with 3D animations */}
          <motion.div
            className="lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Floating badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-green-200"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">
                Fresh & Organic Marketplace
              </span>
            </motion.div>

            {/* Main heading with gradient */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Fresh from Farm
              </span>
              <br />
              <span className="text-gray-800">to Your Home</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Connect directly with local farmers and get fresh, organic produce
              delivered to your doorstep. No middlemen, better prices, fresher
              food.
            </motion.p>

            {/* CTA Buttons with 3D effects */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/farmer/register" className="flex-1 sm:flex-initial">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold shadow-lg"
                  >
                    <Leaf className="w-5 h-5 mr-2" />
                    I'm a Farmer
                  </Button>
                </motion.div>
              </Link>

              <Link to="/customer/register" className="flex-1 sm:flex-initial">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    I'm a Customer
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Stats with 3D cards */}
            <motion.div
              className="flex gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {[
                { number: '500+', label: 'Farmers' },
                { number: '10K+', label: 'Customers' },
                { number: '50K+', label: 'Orders' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex-1 p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 shadow-lg"
                  whileHover={{
                    y: -5,
                    boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-green-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - 3D Image */}
          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Main image with 3D transform */}
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.05,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Fresh vegetables"
                  className="w-full h-auto"
                />
                
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent" />
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl"
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-xl"
                animate={{
                  rotate: -360,
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
