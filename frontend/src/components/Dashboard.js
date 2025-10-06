import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HabitForm from './HabitForm';
import MoodForm from './MoodForm';
import TrendsChart from './TrendsChart';
import Recommendations from './Recommendations';
import NotificationHandler from './NotificationHandler';
import WellnessScoreRing from './WellnessScoreRing';
import DailyCheckInForm from './DailyCheckInForm';
import QuickStats from './QuickStats';
import HabitTracker from './HabitTracker';
import PieChartAnalytics from './PieChartAnalytics';
import MoodJournal from './MoodJournal';
// Removed DetailedAnalytics import to fix missing module error
import { getHabits, getMoods, getPredictions } from '../utils/api';

const Dashboard = () => {
  const [data, setData] = useState({ habits: [], moods: [], predictions: [] });
  const [wellnessScore, setWellnessScore] = useState(75);
  const [todayMood, setTodayMood] = useState('😊');
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [habits, moods, predictions] = await Promise.all([getHabits(), getMoods(), getPredictions()]);
        setData({ habits, moods, predictions });

        // Calculate wellness score based on recent data
        if (moods.length > 0) {
          const recentMoods = moods.slice(-7);
          const avgMood = recentMoods.reduce((sum, mood) => sum + mood.rating, 0) / recentMoods.length;
          setWellnessScore(Math.round((avgMood / 10) * 100));
        }
      } catch (error) {
        console.error('Data fetch error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <NotificationHandler />

      {/* Daily Check-in Form Modal */}
      {showDailyCheckIn && (
        <DailyCheckInForm onClose={() => setShowDailyCheckIn(false)} />
      )}

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 card-hover"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Let's track your wellness journey today
            </p>
            <button
              onClick={() => setShowDailyCheckIn(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
            >
              📝 Start Daily Check-in
            </button>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <WellnessScoreRing score={wellnessScore} />
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{wellnessScore}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">AI Wellness Score</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today's Mood & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6 card-hover"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Today's Mood</h3>
          <div className="text-center">
            <div className="text-6xl mb-2">{todayMood}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Feeling great today!</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <QuickStats data={data} />
        </motion.div>
      </div>

      {/* Habit Tracking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6 card-hover"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Habit Tracking</h3>
        <HabitTracker habits={data.habits} />
      </motion.div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6 card-hover"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Analytics Overview</h3>
          <PieChartAnalytics data={data} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6 card-hover"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">AI Recommendations</h3>
          <Recommendations predictions={data.predictions} />
        </motion.div>
      </div>

      {/* Mood Journal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-6 card-hover"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mood Journal</h3>
        <MoodJournal moods={data.moods} />
      </motion.div>

      {/* Legacy Components (for compatibility) */}
      <div className="hidden">
        <HabitForm />
        <MoodForm />
        <TrendsChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
