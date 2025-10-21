import React from 'react';
import { BookOpen, Brain, Clock, MessageSquare, Users, Zap, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Study Assistant',
      description: 'Get instant help with your questions using advanced AI technology. Receive detailed explanations and study tips tailored to your needs.',
      color: 'primary',
    },
    {
      icon: BookOpen,
      title: 'Smart Notes System',
      description: 'Create, organize, and search your study notes with ease. Rich text formatting, tagging, and categorization keep your notes organized.',
      color: 'green',
    },
    {
      icon: Zap,
      title: 'Flashcards with Spaced Repetition',
      description: 'Master concepts efficiently with our intelligent flashcard system. Tracks your progress and optimizes review timing.',
      color: 'orange',
    },
    {
      icon: Clock,
      title: 'Pomodoro Timer',
      description: 'Stay focused and productive with the proven Pomodoro technique. Track your study sessions and take optimal breaks.',
      color: 'red',
    },
    {
      icon: MessageSquare,
      title: 'Group Study Rooms',
      description: 'Collaborate with peers in real-time. Share ideas, discuss concepts, and learn together in interactive study sessions.',
      color: 'blue',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics. See your study time, completion rates, and areas for improvement.',
      color: 'purple',
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Stay motivated with goals and milestones. Celebrate your progress and build consistent study habits.',
      color: 'yellow',
    },
    {
      icon: Users,
      title: 'Study Community',
      description: 'Connect with fellow students. Share resources, form study groups, and support each other\'s learning goals.',
      color: 'pink',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Powerful Features for Better Learning
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to excel in your studies, all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-2xl transition-shadow"
                >
                  <div className={`bg-${feature.color}-100 dark:bg-${feature.color}-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Supercharge Your Studies?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join StudyBuddy today and start learning smarter
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition text-lg font-medium shadow-lg"
          >
            Get Started Free
          </a>
        </div>
      </section>
    </div>
  );
};

export default Features;
