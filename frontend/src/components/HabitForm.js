import React, { useState } from 'react';
import { postHabit } from '../utils/api';
import { toast } from 'react-toastify';

const HabitForm = () => {
  const [formData, setFormData] = useState({ sleep_hours: 0, meals: 0, activity_minutes: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postHabit(formData);
      toast.success('Habit logged!');
    } catch (error) {
      toast.error('Error logging habit');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animated-card">
      {/* Inputs for sleep, meals, activity */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Log Habit</button>
    </form>
  );
};

export default HabitForm;