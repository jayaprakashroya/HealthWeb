import React from 'react';
import { motion } from 'framer-motion';

const MoodJournal = ({ moods }) => {
  if (!moods || moods.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        No mood entries yet. Start tracking your mood daily!
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {moods.map((entry, index) => (
        <motion.div
          key={entry.id || index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass-card rounded-xl p-4 card-hover"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-2xl">{entry.emoji || '😊'}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(entry.date).toLocaleDateString()}
            </div>
          </div>
          <div className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {entry.notes || 'No notes for this day.'}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MoodJournal;
