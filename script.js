// WellnessAI Dashboard - JavaScript Functionality

class WellnessDashboard {
    constructor() {
        this.currentStep = 1;
        this.checkinData = {
            mood: null,
            energy: 7,
            sleep: 8,
            stress: 3,
            activities: [],
            notes: '',
            foodIntake: []
        };
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadData();
        this.renderDashboard();
        this.applyTheme();
        this.initializeCharts();
        this.updateAuthUI();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Daily check-in modal
        document.getElementById('daily-checkin-btn').addEventListener('click', () => this.openCheckinModal());
        document.getElementById('close-modal').addEventListener('click', () => this.closeCheckinModal());

        // Modal navigation
        document.getElementById('prev-btn').addEventListener('click', () => this.previousStep());
        document.getElementById('next-btn').addEventListener('click', () => this.nextStep());

        // Mood selection
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectMood(e.target.closest('.mood-btn')));
        });

        // Sliders
        document.getElementById('energy-slider').addEventListener('input', (e) => this.updateEnergy(e.target.value));
        document.getElementById('stress-slider').addEventListener('input', (e) => this.updateStress(e.target.value));

        // Activities
        document.querySelectorAll('.activity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleActivity(e.target));
        });

        // Notes
        document.getElementById('notes-input').addEventListener('input', (e) => {
            this.checkinData.notes = e.target.value;
        });

        // Food intake add button
        document.getElementById('add-food-btn').addEventListener('click', () => this.addFoodItem());

        // Auth buttons
        document.getElementById('login-btn').addEventListener('click', () => this.showLoginForm());
        document.getElementById('signup-btn').addEventListener('click', () => this.showSignupForm());
        document.getElementById('logout-btn').addEventListener('click', () => this.logout());

        // Click outside modal to close
        document.getElementById('checkin-modal').addEventListener('click', (e) => {
            if (e.target.id === 'checkin-modal') {
                this.closeCheckinModal();
            }
        });
    }

    // Theme Management
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.body.classList.toggle('dark', this.theme === 'dark');
        const themeIcon = document.querySelector('#theme-toggle i');
        themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Modal Management
    openCheckinModal() {
        document.getElementById('checkin-modal').classList.remove('hidden');
        document.getElementById('checkin-modal').classList.add('modal-enter');
        this.currentStep = 1;
        this.updateModalDisplay();
    }

    closeCheckinModal() {
        document.getElementById('checkin-modal').classList.add('hidden');
        this.resetCheckinData();
    }

    updateModalDisplay() {
        // Update step indicators
        for (let i = 1; i <= 5; i++) {
            const stepEl = document.getElementById(`step-${i}`);
            stepEl.className = `w-3 h-3 rounded-full ${i <= this.currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`;
        }

        // Show current step content
        document.querySelectorAll('.step-content').forEach((content, index) => {
            if (index + 1 === this.currentStep) {
                content.classList.remove('hidden');
                content.classList.add('step-enter');
            } else {
                content.classList.add('hidden');
            }
        });

        // Update navigation buttons
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.disabled = this.currentStep === 1;
        nextBtn.textContent = this.currentStep === 5 ? 'Complete Check-in' : 'Next';
    }

    nextStep() {
        if (this.currentStep < 5) {
            this.currentStep++;
            this.updateModalDisplay();
        } else {
            this.completeCheckin();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateModalDisplay();
        }
    }

    // Check-in Data Management
    selectMood(button) {
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('ring-2', 'ring-blue-500');
        });
        button.classList.add('ring-2', 'ring-blue-500');
        this.checkinData.mood = button.dataset.mood;
        this.updateSummary();
    }

    updateEnergy(value) {
        this.checkinData.energy = parseInt(value);
        document.getElementById('energy-value').textContent = value;
        this.updateSummary();
    }

    updateStress(value) {
        this.checkinData.stress = parseInt(value);
        document.getElementById('stress-value').textContent = value;
        this.updateSummary();
    }

    toggleActivity(button) {
        const activity = button.dataset.activity;
        const index = this.checkinData.activities.indexOf(activity);

        if (index > -1) {
            this.checkinData.activities.splice(index, 1);
            button.classList.remove('activity-selected');
        } else {
            this.checkinData.activities.push(activity);
            button.classList.add('activity-selected');
        }

        this.updateSummary();
    }

    updateSummary() {
        document.getElementById('summary-mood').textContent = this.checkinData.mood || 'Not selected';
        document.getElementById('summary-energy').textContent = `${this.checkinData.energy}/10`;
        document.getElementById('summary-sleep').textContent = `${this.checkinData.sleep} hours`;
        document.getElementById('summary-stress').textContent = `${this.checkinData.stress}/10`;
        document.getElementById('summary-activities').textContent = this.checkinData.activities.length > 0 ? this.checkinData.activities.join(', ') : 'None selected';

        if (this.checkinData.foodIntake.length > 0) {
            const totalCalories = this.checkinData.foodIntake.reduce((sum, item) => sum + item.calories, 0);
            document.getElementById('summary-food').textContent = `${this.checkinData.foodIntake.length} items, ${totalCalories} cal`;
        } else {
            document.getElementById('summary-food').textContent = 'None logged';
        }

        // Update nutrition summary
        const totalCalories = this.checkinData.foodIntake.reduce((sum, item) => sum + item.calories, 0);
        document.getElementById('total-calories').textContent = totalCalories;
        document.getElementById('food-count').textContent = this.checkinData.foodIntake.length;
    }

    // Food Intake Management
    addFoodItem() {
        const foodNameInput = document.getElementById('food-name-input');
        const foodCaloriesInput = document.getElementById('food-calories-input');
        const foodName = foodNameInput.value.trim();
        const calories = parseInt(foodCaloriesInput.value);

        if (!foodName) {
            this.showNotification('Please enter a food name.', 'error');
            return;
        }
        if (isNaN(calories) || calories < 0) {
            this.showNotification('Please enter a valid calorie amount.', 'error');
            return;
        }

        // Add to checkinData
        this.checkinData.foodIntake.push({ name: foodName, calories: calories });

        // Update UI
        this.renderFoodItems();

        // Clear inputs
        foodNameInput.value = '';
        foodCaloriesInput.value = '';

        // Update summary
        this.updateSummary();
    }

    renderFoodItems() {
        const container = document.getElementById('food-items-container');
        container.innerHTML = '';

        this.checkinData.foodIntake.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded px-3 py-1 mb-2';

            const nameEl = document.createElement('span');
            nameEl.textContent = `${item.name} (${item.calories} cal)`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'text-red-500 hover:text-red-700 text-sm';
            removeBtn.addEventListener('click', () => {
                this.checkinData.foodIntake.splice(index, 1);
                this.renderFoodItems();
                this.updateSummary();
            });

            itemEl.appendChild(nameEl);
            itemEl.appendChild(removeBtn);
            container.appendChild(itemEl);
        });
    }

    completeCheckin() {
        // Check if user is authenticated
        const token = localStorage.getItem('access_token');
        if (!token) {
            this.showNotification('Please login to save your check-in.', 'error');
            return;
        }

        // Calculate wellness score
        const wellnessScore = this.calculateWellnessScore();

        // Create check-in entry
        const checkinEntry = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            ...this.checkinData,
            wellnessScore: wellnessScore,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        const checkins = this.getStoredData('dailyCheckins') || [];
        checkins.unshift(checkinEntry); // Add to beginning
        localStorage.setItem('dailyCheckins', JSON.stringify(checkins));

        // Generate AI recommendation
        const recommendation = this.generateRecommendation(checkinEntry);
        const recommendations = this.getStoredData('recommendations') || [];
        recommendations.unshift({
            id: Date.now(),
            date: checkinEntry.date,
            recommendation: recommendation,
            wellnessScore: wellnessScore
        });
        localStorage.setItem('recommendations', JSON.stringify(recommendations));

        // Show success notification
        this.showNotification('Daily check-in completed successfully!', 'success');

        // Close modal and refresh dashboard
        this.closeCheckinModal();
        this.renderDashboard();
        this.updateCharts();
    }

    calculateWellnessScore() {
        const { mood, energy, sleep, stress, foodIntake } = this.checkinData;

        // Mood score (simplified)
        let moodScore = 5;
        if (mood === '😊') moodScore = 9;
        else if (mood === '🙂') moodScore = 7;
        else if (mood === '😐') moodScore = 5;
        else if (mood === '😕') moodScore = 4;
        else if (mood === '😢' || mood === '😤' || mood === '😰') moodScore = 3;

        // Sleep score
        let sleepScore = 5;
        if (sleep >= 7 && sleep <= 9) sleepScore = 10;
        else if (sleep >= 6 && sleep < 7) sleepScore = 7;
        else if (sleep > 9 && sleep <= 10) sleepScore = 8;
        else sleepScore = 4;

        // Stress score (inverted)
        const stressScore = 11 - stress;

        // Nutrition score based on calories (assuming 2000 cal is optimal)
        const totalCalories = foodIntake.reduce((sum, item) => sum + item.calories, 0);
        let nutritionScore = 5;
        if (totalCalories >= 1500 && totalCalories <= 2500) nutritionScore = 10;
        else if (totalCalories >= 1200 && totalCalories < 1500) nutritionScore = 7;
        else if (totalCalories > 2500 && totalCalories <= 3000) nutritionScore = 7;
        else if (totalCalories < 1200) nutritionScore = 3;
        else if (totalCalories > 3000) nutritionScore = 3;

        // Weighted calculation (adjusted weights to include nutrition)
        const weights = { mood: 0.25, energy: 0.2, sleep: 0.2, stress: 0.15, nutrition: 0.2 };
        const totalScore = (
            moodScore * weights.mood +
            energy * weights.energy +
            sleepScore * weights.sleep +
            stressScore * weights.stress +
            nutritionScore * weights.nutrition
        );

        return Math.round(totalScore * 10) / 10;
    }

    generateRecommendation(checkin) {
        const { wellnessScore, mood, energy, sleep, stress, activities } = checkin;

        if (wellnessScore >= 8) {
            return "Excellent wellness score! You're doing great. Consider maintaining your current healthy habits and maybe share your success strategies with others.";
        } else if (wellnessScore >= 6) {
            return "Good progress! Focus on consistency with your habits. Small improvements add up over time.";
        } else if (stress > 6) {
            return "You seem stressed. Try incorporating short meditation sessions or deep breathing exercises into your daily routine.";
        } else if (sleep < 7) {
            return "Your sleep could be better. Aim for 7-9 hours of quality sleep. Consider establishing a consistent bedtime routine.";
        } else if (energy < 5) {
            return "Your energy levels are low. Make sure you're staying hydrated, eating nutritious meals, and getting some physical activity.";
        } else {
            return "Focus on building positive habits. Start small with one or two activities you enjoy and build from there.";
        }
    }

    resetCheckinData() {
        this.checkinData = {
            mood: null,
            energy: 7,
            sleep: 8,
            stress: 3,
            activities: [],
            notes: '',
            foodIntake: []
        };
        this.currentStep = 1;

        // Reset UI elements
        document.querySelectorAll('.mood-btn').forEach(btn => {
            btn.classList.remove('ring-2', 'ring-blue-500');
        });
        document.getElementById('energy-slider').value = 7;
        document.getElementById('stress-slider').value = 3;
        document.getElementById('notes-input').value = '';
        document.querySelectorAll('.activity-btn').forEach(btn => {
            btn.classList.remove('activity-selected');
        });
        // Reset food intake UI
        document.getElementById('food-items-container').innerHTML = '';
        document.getElementById('food-name-input').value = '';
        document.getElementById('food-calories-input').value = '';
    }

    // Data Management
    getStoredData(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch {
            return [];
        }
    }

    loadData() {
        // Load sample data if no data exists
        if (!localStorage.getItem('dailyCheckins')) {
            this.loadSampleData();
        }
    }

    loadSampleData() {
        const sampleCheckins = [
            {
                id: 1,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                mood: '😊',
                energy: 8,
                sleep: 7.5,
                stress: 3,
                activities: ['Exercise', 'Reading', 'Work'],
                notes: 'Had a productive morning workout and finished an important project.',
                wellnessScore: 8.2,
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                mood: '😕',
                energy: 6,
                sleep: 6.5,
                stress: 6,
                activities: ['Work', 'Socializing'],
                notes: 'Long day at work, feeling a bit drained but good to connect with friends.',
                wellnessScore: 6.1,
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];

        const sampleHabits = [
            { id: 1, name: 'Exercise', completed: true, category: 'exercise' },
            { id: 2, name: '8 Hours Sleep', completed: true, category: 'sleep' },
            { id: 3, name: '3 Healthy Meals', completed: false, category: 'meals' },
            { id: 4, name: 'Work Tasks', completed: true, category: 'work' },
            { id: 5, name: 'Social Time', completed: false, category: 'social' }
        ];

        const sampleMoods = [
            { id: 1, mood: '😊', note: 'Feeling productive today!', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
            { id: 2, mood: '😐', note: 'Just an average day', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
            { id: 3, mood: '😊', note: 'Great workout session!', date: new Date().toISOString().split('T')[0] }
        ];

        localStorage.setItem('dailyCheckins', JSON.stringify(sampleCheckins));
        localStorage.setItem('habits', JSON.stringify(sampleHabits));
        localStorage.setItem('moods', JSON.stringify(sampleMoods));
    }

    // Dashboard Rendering
    renderDashboard() {
        this.renderWellnessScore();
        this.renderQuickStats();
        this.renderHabits();
        this.renderMoodJournal();
        this.renderRecommendations();
    }

    renderWellnessScore() {
        const checkins = this.getStoredData('dailyCheckins');
        const todayCheckin = checkins.find(c => c.date === new Date().toISOString().split('T')[0]);

        if (todayCheckin) {
            const score = todayCheckin.wellnessScore;
            const angle = (score / 10) * 360;

            const ringContainer = document.getElementById('wellness-score');
            ringContainer.innerHTML = `
                <div class="wellness-ring" style="--score-angle: ${angle}deg">
                    <div class="wellness-ring-text">${score}</div>
                </div>
            `;

            document.getElementById('today-mood').textContent = todayCheckin.mood;
        }
    }

    renderQuickStats() {
        const checkins = this.getStoredData('dailyCheckins');
        const habits = this.getStoredData('habits');

        // Sleep hours
        const avgSleep = checkins.length > 0 ?
            checkins.reduce((sum, c) => sum + c.sleep, 0) / checkins.length : 8.0;
        document.getElementById('sleep-hours').textContent = avgSleep.toFixed(1);

        // Mood average (simplified)
        const moodScores = checkins.map(c => {
            if (c.mood === '😊') return 9;
            if (c.mood === '🙂') return 7;
            if (c.mood === '😐') return 5;
            if (c.mood === '😕') return 4;
            return 3;
        });
        const avgMood = moodScores.length > 0 ?
            moodScores.reduce((sum, s) => sum + s, 0) / moodScores.length : 7.8;
        document.getElementById('mood-average').textContent = avgMood.toFixed(1);

        // Habits completed
        const completedHabits = habits.filter(h => h.completed).length;
        document.getElementById('habits-completed').textContent = `${completedHabits}/${habits.length}`;

        // Current streak (simplified)
        document.getElementById('current-streak').textContent = checkins.length;
    }

    renderHabits() {
        const habits = this.getStoredData('habits');
        const container = document.getElementById('habit-tracker');

        container.innerHTML = habits.map(habit => `
            <div class="habit-item ${habit.completed ? 'completed' : ''}" onclick="dashboard.toggleHabit(${habit.id})">
                <div class="flex items-center space-x-3">
                    <div class="habit-icon habit-${habit.category}">
                        <i class="fas ${this.getHabitIcon(habit.category)}"></i>
                    </div>
                    <div>
                        <h3 class="font-medium text-gray-900 dark:text-white">${habit.name}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${habit.completed ? 'Completed' : 'Pending'}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    ${habit.completed ? '<i class="fas fa-check-circle text-green-500"></i>' : '<i class="far fa-circle text-gray-400"></i>'}
                </div>
            </div>
        `).join('');
    }

    renderMoodJournal() {
        const moods = this.getStoredData('moods');
        const container = document.getElementById('mood-journal');

        container.innerHTML = moods.slice(0, 5).map(mood => `
            <div class="mood-entry">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <span class="mood-emoji">${mood.mood}</span>
                        <div>
                            <p class="font-medium text-gray-900 dark:text-white">${this.getMoodLabel(mood.mood)}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400">${mood.date}</p>
                        </div>
                    </div>
                </div>
                ${mood.note ? `<p class="mt-2 text-gray-700 dark:text-gray-300">${mood.note}</p>` : ''}
            </div>
        `).join('');
    }

    renderRecommendations() {
        const recommendations = this.getStoredData('recommendations');
        const container = document.getElementById('recommendations');

        container.innerHTML = recommendations.slice(0, 3).map(rec => `
            <div class="recommendation-card">
                <div class="flex items-start space-x-3">
                    <div class="flex-shrink-0">
                        <i class="fas fa-lightbulb text-blue-600 text-lg"></i>
                    </div>
                    <div>
                        <p class="text-gray-900 dark:text-white font-medium">${rec.recommendation}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Wellness Score: ${rec.wellnessScore}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Utility Functions
    getHabitIcon(category) {
        const icons = {
            exercise: 'fa-dumbbell',
            sleep: 'fa-moon',
            meals: 'fa-utensils',
            work: 'fa-briefcase',
            social: 'fa-users'
        };
        return icons[category] || 'fa-check';
    }

    getMoodLabel(mood) {
        const labels = {
            '😊': 'Happy',
            '🙂': 'Content',
            '😐': 'Neutral',
            '😕': 'Unsure',
            '😢': 'Sad',
            '😤': 'Frustrated',
            '😰': 'Anxious',
            '😴': 'Tired'
        };
        return labels[mood] || 'Unknown';
    }

    toggleHabit(habitId) {
        const habits = this.getStoredData('habits');
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            habit.completed = !habit.completed;
            localStorage.setItem('habits', JSON.stringify(habits));
            this.renderHabits();
            this.renderQuickStats();
        }
    }

    // Charts
    initializeCharts() {
        this.updateCharts();
    }

    updateCharts() {
        this.renderMoodChart();
        this.renderHabitChart();
    }

    renderMoodChart() {
        const checkins = this.getStoredData('dailyCheckins');
        const moodCounts = {};

        checkins.forEach(checkin => {
            const label = this.getMoodLabel(checkin.mood);
            moodCounts[label] = (moodCounts[label] || 0) + 1;
        });

        const ctx = document.getElementById('mood-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(moodCounts),
                datasets: [{
                    data: Object.values(moodCounts),
                    backgroundColor: [
                        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    renderHabitChart() {
        const habits = this.getStoredData('habits');
        const completed = habits.filter(h => h.completed).length;
        const pending = habits.length - completed;

        const ctx = document.getElementById('habit-chart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    data: [completed, pending],
                    backgroundColor: ['#10b981', '#e2e8f0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Notifications
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Authentication Methods
    updateAuthUI() {
        const token = localStorage.getItem('access_token');
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const userGreeting = document.getElementById('user-greeting');
        const mainContent = document.querySelector('main');

        if (token) {
            // User is logged in
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');
            mainContent.classList.remove('hidden');
            // Decode token to get username (simplified)
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                userGreeting.textContent = `Hello, ${payload.sub || 'User'}!`;
            } catch (e) {
                userGreeting.textContent = 'Hello, User!';
            }
        } else {
            // User is not logged in
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
            mainContent.classList.add('hidden');
        }
    }

    showLoginForm() {
        this.showAuthModal('login');
    }

    showSignupForm() {
        this.showAuthModal('signup');
    }

    showAuthModal(type) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${type === 'login' ? 'Login' : 'Sign Up'}</h2>
                    <button id="close-auth-modal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <form id="auth-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                        <input type="text" id="username" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input type="password" id="password" required class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                    </div>
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                        ${type === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <div class="mt-4 text-center">
                    <button id="switch-auth-mode" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        ${type === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        document.getElementById('close-auth-modal').addEventListener('click', () => modal.remove());
        document.getElementById('switch-auth-mode').addEventListener('click', () => {
            modal.remove();
            this.showAuthModal(type === 'login' ? 'signup' : 'login');
        });

        document.getElementById('auth-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                if (type === 'login') {
                    await this.login(username, password);
                } else {
                    await this.signup(username, password);
                }
                modal.remove();
            } catch (error) {
                this.showNotification(error.message, 'error');
            }
        });
    }

    async login(username, password) {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed. Please check your credentials.');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        this.updateAuthUI();
        this.showNotification('Login successful!', 'success');
    }

    async signup(username, password) {
        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Registration failed. Username might already exist.');
        }

        this.showNotification('Registration successful! Please login.', 'success');
    }

    logout() {
        localStorage.removeItem('access_token');
        this.updateAuthUI();
        this.showNotification('Logged out successfully.', 'success');
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new WellnessDashboard();
});
