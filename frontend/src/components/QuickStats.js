import React from 'react';
import { motion } from 'framer-motion';

const QuickStats = ({ data }) => {
  const calculateStats = () => {
    const { habits, moods } = data;

    // Calculate average sleep
    const avgSleep = habits.length > 0
      ? habits.reduce((sum, h) => sum + (h.sleep_hours || 0), 0) / habits.length
      : 0;

    // Calculate average mood
    const avgMood = moods.length > 0
      ? moods.reduce((sum, m) => sum + (m.rating || 0), 0) / moods.length
      : 0;

    // Calculate habit completion rate
    const totalHabits = habits.length;
    const completedHabits = habits.filter(h => h.completed).length;
    const completionRate = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

    // Calculate streak (simplified - consecutive days with completed habits)
    let currentStreak = 0;
    const sortedHabits = [...habits].sort((a, b) => new Date(b.date) - new Date(a.date));
    for (const habit of sortedHabits) {
      if (habit.completed) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      avgSleep: avgSleep.toFixed(1),
      avgMood: avgMood.toFixed(1),
      completionRate: completionRate.toFixed(0),
      currentStreak
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Avg Sleep',
      value: `${stats.avgSleep}h`,
      icon: '😴',
      color: 'from-blue-500 to-blue-600',
      trend: '+0.2h',
      trendUp: true
    },
    {
      title: 'Avg Mood',
      value: stats.avgMood,
      icon: '😊',
      color: 'from-green-500 to-green-600',
      trend: '+0.3',
      trendUp: true
    },
    {
      title: 'Habit Completion',
      value: `${stats.completionRate}%`,
      icon: '✅',
      color: 'from-purple-500 to-purple-600',
      trend: '+5%',
      trendUp: true
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: '🔥',
      color: 'from-orange-500 to-red-500',
      trend: '+2 days',
      trendUp: true
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card rounded-xl p-4 card-hover data-point"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl`}>
              {stat.icon}
            </div>
            <div className={`trend-indicator ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
              {stat.trend}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {stat.title}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickStats;
