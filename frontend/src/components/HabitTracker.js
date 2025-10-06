import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HabitTracker = ({ habits }) => {
  const [selectedHabits, setSelectedHabits] = useState([]);

  const defaultHabits = [
    { id: 1, name: 'Drink Water', icon: '💧', target: 8, current: 6, unit: 'glasses' },
    { id: 2, name: 'Exercise', icon: '🏃‍♂️', target: 30, current: 25, unit: 'minutes' },
    { id: 3, name: 'Read', icon: '📚', target: 20, current: 15, unit: 'minutes' },
    { id: 4, name: 'Meditate', icon: '🧘‍♀️', target: 10, current: 10, unit: 'minutes' },
    { id: 5, name: 'Sleep', icon: '😴', target: 8, current: 7.5, unit: 'hours' },
    { id: 6, name: 'Healthy Eating', icon: '🥗', target: 5, current: 4, unit: 'meals' }
  ];

  const toggleHabit = (habitId) => {
    setSelectedHabits(prev =>
      prev.includes(habitId)
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const getProgressColor = (current, target) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressWidth = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultHabits.map((habit, index) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl p-4 card-hover cursor-pointer transition-all ${
              selectedHabits.includes(habit.id) ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => toggleHabit(habit.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{habit.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{habit.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {habit.current}/{habit.target} {habit.unit}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {Math.round((habit.current / habit.target) * 100)}%
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressWidth(habit.current, habit.target)}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className={`h-2 rounded-full ${getProgressColor(habit.current, habit.target)}`}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Progress</span>
              <span>
                {habit.current >= habit.target ? '✅ Complete' : `${habit.target - habit.current} ${habit.unit} left`}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedHabits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card rounded-xl p-4"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Selected Habits ({selectedHabits.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedHabits.map(habitId => {
              const habit = defaultHabits.find(h => h.id === habitId);
              return (
                <div
                  key={habitId}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{habit.icon}</span>
                  <span>{habit.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHabit(habitId);
                    }}
                    className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HabitTracker;
