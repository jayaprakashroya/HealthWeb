import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const DailyCheckInForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    mood: '',
    energy: 5,
    sleep: 8,
    stress: 3,
    activities: [],
    notes: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would submit the data to your API
      console.log('Submitting daily check-in:', formData);
      toast.success('Daily check-in completed! 🎉');
      onClose();
    } catch (error) {
      toast.error('Failed to save check-in');
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const moodOptions = [
    { emoji: '😢', label: 'Very Sad', value: 1 },
    { emoji: '😕', label: 'Sad', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '🙂', label: 'Good', value: 4 },
    { emoji: '😊', label: 'Happy', value: 5 },
    { emoji: '😄', label: 'Very Happy', value: 6 }
  ];

  const activityOptions = [
    'Exercise', 'Meditation', 'Reading', 'Socializing', 'Work', 'Hobbies', 'Rest', 'Learning'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">How are you feeling today?</h3>
              <p className="text-gray-600 dark:text-gray-400">Select your current mood</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => updateFormData('mood', mood.emoji)}
                  className={`mood-emoji p-4 rounded-xl border-2 transition-all ${
                    formData.mood === mood.emoji
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 selected'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Energy & Sleep</h3>
              <p className="text-gray-600 dark:text-gray-400">Rate your energy levels and sleep quality</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="form-label">Energy Level (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.energy}
                  onChange={(e) => updateFormData('energy', parseInt(e.target.value))}
                  className="habit-slider w-full"
                />
                <div className="text-center mt-2 text-lg font-semibold">{formData.energy}/10</div>
              </div>
              <div>
                <label className="form-label">Sleep Hours</label>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={formData.sleep}
                  onChange={(e) => updateFormData('sleep', parseFloat(e.target.value))}
                  className="habit-slider w-full"
                />
                <div className="text-center mt-2 text-lg font-semibold">{formData.sleep} hours</div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Stress & Activities</h3>
              <p className="text-gray-600 dark:text-gray-400">How stressed are you and what did you do today?</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="form-label">Stress Level (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stress}
                  onChange={(e) => updateFormData('stress', parseInt(e.target.value))}
                  className="habit-slider w-full"
                />
                <div className="text-center mt-2 text-lg font-semibold">{formData.stress}/10</div>
              </div>
              <div>
                <label className="form-label">Today's Activities</label>
                <div className="checkbox-group">
                  {activityOptions.map((activity) => (
                    <label key={activity} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.activities.includes(activity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData('activities', [...formData.activities, activity]);
                          } else {
                            updateFormData('activities', formData.activities.filter(a => a !== activity));
                          }
                        }}
                      />
                      {activity}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Additional Notes</h3>
              <p className="text-gray-600 dark:text-gray-400">Anything else you'd like to note about today?</p>
            </div>
            <div>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                placeholder="How was your day? Any thoughts or reflections..."
                className="form-input w-full h-32 resize-none"
                rows="4"
              />
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Mood: {formData.mood}</div>
                <div>Energy: {formData.energy}/10</div>
                <div>Sleep: {formData.sleep} hours</div>
                <div>Stress: {formData.stress}/10</div>
                <div>Activities: {formData.activities.join(', ') || 'None selected'}</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Check-in</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="progress-indicator mb-8">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i + 1}
                  className={`step ${i + 1 === currentStep ? 'active' : i + 1 < currentStep ? 'completed' : ''}`}
                >
                  <div className="step-number">{i + 1}</div>
                  <span className="ml-2 text-sm">
                    {i === 0 ? 'Mood' : i === 1 ? 'Energy' : i === 2 ? 'Activities' : 'Notes'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={handleNext}
                  disabled={currentStep === 1 && !formData.mood}
                  className="submit-btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="submit-btn"
                >
                  Complete Check-in
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyCheckInForm;
