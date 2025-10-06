import { useState } from 'react';
import { toast } from 'react-toastify';
import { postMood } from '../utils/api';

const MoodForm = () => {
  const [formData, setFormData] = useState({ mood: '', note: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await postMood(formData);
      toast.success('Mood logged!');
      setFormData({ mood: '', note: '' });
    } catch {
      toast.error('Error logging mood');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animated-card">
      <input name="mood" value={formData.mood} onChange={handleChange} placeholder="Mood" className="mb-2 p-2 border rounded w-full" />
      <textarea name="note" value={formData.note} onChange={handleChange} placeholder="Note" className="mb-2 p-2 border rounded w-full" />
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">Log Mood</button>
    </form>
  );
};

export default MoodForm;
