import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartAnalytics = ({ data }) => {
  // Sample data for demonstration - in real app, this would be calculated from actual data
  const moodData = {
    labels: ['Happy', 'Neutral', 'Sad', 'Anxious', 'Excited'],
    datasets: [{
      data: [35, 25, 15, 15, 10],
      backgroundColor: [
        '#10b981', // green
        '#6b7280', // gray
        '#ef4444', // red
        '#f59e0b', // yellow
        '#8b5cf6'  // purple
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const habitData = {
    labels: ['Completed', 'In Progress', 'Not Started'],
    datasets: [{
      data: [60, 30, 10],
      backgroundColor: [
        '#10b981', // green
        '#f59e0b', // yellow
        '#ef4444'  // red
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card rounded-xl p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Mood Distribution
        </h4>
        <div className="h-64">
          <Pie data={moodData} options={options} />
        </div>
      </div>

      <div className="glass-card rounded-xl p-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
          Habit Completion
        </h4>
        <div className="h-64">
          <Pie data={habitData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChartAnalytics;
