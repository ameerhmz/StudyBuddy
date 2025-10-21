import React from 'react';
import { BookOpen, Target, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About StudyBuddy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Empowering students to achieve their learning goals through intelligent study tools and collaborative features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                StudyBuddy was created to revolutionize the way students learn and study. We believe that with the right tools and support, every student can achieve academic excellence.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our platform combines AI-powered assistance, proven study techniques, and collaborative features to create the ultimate learning environment.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              <ValueCard icon={Target} title="Focused" description="Stay on track with your goals" />
              <ValueCard icon={Users} title="Collaborative" description="Learn together" />
              <ValueCard icon={Zap} title="Efficient" description="Optimize your time" />
              <ValueCard icon={BookOpen} title="Comprehensive" description="All-in-one platform" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="AI-Powered Learning"
              description="Get personalized study assistance and explanations powered by advanced AI technology."
            />
            <FeatureCard
              title="Evidence-Based Methods"
              description="Our tools are built on proven study techniques like spaced repetition and the Pomodoro method."
            />
            <FeatureCard
              title="Community Driven"
              description="Connect with fellow students, share knowledge, and learn together in real-time."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon: Icon, title, description }) => (
  <div className="card text-center">
    <div className="bg-primary-100 dark:bg-primary-900/30 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
    </div>
    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

const FeatureCard = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="card"
  >
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default About;
