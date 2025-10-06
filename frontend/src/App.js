import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';
// Import other components as needed

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />;
  }
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300">
        {/* Navigation */}
        <nav className="gradient-primary shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">WellnessAI</h1>
                  <p className="text-sm text-white opacity-80">AI-Powered Health Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle toggle={setDarkMode} />
                <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-30 transition-all">
                  📝 Daily Check-in
                </button>
                <div className="text-white text-right">
                  <div className="text-sm opacity-80">Welcome back,</div>
                  <div className="font-semibold">User</div>
                </div>
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <Dashboard />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
