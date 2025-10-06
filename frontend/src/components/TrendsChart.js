import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendsChart = ({ data }) => {
  const chartData = {
    labels: data.habits.map(h => h.date),
    datasets: [
      { label: 'Sleep Hours', data: data.habits.map(h => h.sleep_hours), borderColor: 'blue' },
      // Add more datasets for moods, etc.
    ],
  };

  return <Line data={chartData} className="animated-card" />;
};

export default TrendsChart;