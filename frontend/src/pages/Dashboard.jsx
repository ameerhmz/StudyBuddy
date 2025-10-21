import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { studySessionsAPI, notesAPI, flashcardsAPI } from '../services/api';
import { BookOpen, FileText, Clock, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [sessionsRes, notesRes, flashcardsRes] = await Promise.all([
        studySessionsAPI.getStats(7),
        notesAPI.getAll({ limit: 5 }),
        flashcardsAPI.getAll({ limit: 5 }),
      ]);

      setStats({
        sessions: sessionsRes.data,
        notes: notesRes.data,
        flashcards: flashcardsRes.data,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your learning progress overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Clock}
          title="Study Time (7 days)"
          value={`${stats?.sessions?.total_minutes || 0} min`}
          color="primary"
        />
        <StatCard
          icon={TrendingUp}
          title="Sessions Completed"
          value={stats?.sessions?.total_sessions || 0}
          color="secondary"
        />
        <StatCard
          icon={FileText}
          title="Notes Created"
          value={stats?.notes?.length || 0}
          color="green"
        />
        <StatCard
          icon={BookOpen}
          title="Flashcards"
          value={stats?.flashcards?.length || 0}
          color="orange"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-primary-600" />
            Recent Notes
          </h2>
          {stats?.notes?.length > 0 ? (
            <div className="space-y-3">
              {stats.notes.slice(0, 5).map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white">{note.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(note.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No notes yet. Start creating!</p>
          )}
        </motion.div>

        {/* Recent Flashcards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-secondary-600" />
            Flashcards Progress
          </h2>
          {stats?.flashcards?.length > 0 ? (
            <div className="space-y-3">
              {stats.flashcards.slice(0, 5).map((card) => (
                <div
                  key={card.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {card.question.substring(0, 40)}...
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < card.mastery_level
                              ? 'bg-green-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No flashcards yet. Start learning!</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, color }) => {
  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
    >
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </motion.div>
  );
};

export default Dashboard;
