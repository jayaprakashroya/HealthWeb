# WellnessAI - Personal Health & Mood Dashboard

A comprehensive wellness tracking application built with **HTML, CSS, and JavaScript** - perfect for showcasing frontend development skills in your resume!

## ✨ Features

- **📊 Interactive Dashboard**: Real-time wellness metrics and animated charts
- **📝 Daily Check-ins**: Multi-step form for comprehensive health tracking
- **🎯 Wellness Score**: AI-calculated health score with animated ring visualization
- **📈 Habit Tracking**: Visual habit completion with progress indicators
- **😊 Mood Journal**: Emoji-based mood logging with notes
- **📊 Analytics**: Pie charts and data visualizations using Chart.js
- **🤖 AI Recommendations**: Personalized wellness suggestions
- **🌙 Dark/Light Theme**: Modern UI with smooth theme transitions
- **💾 Local Storage**: Persistent data storage without backend
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Quick Start

### Option 1: Open Directly in Browser
1. Download/clone this repository
2. Open `index.html` in your web browser
3. Start tracking your wellness!

### Option 2: Run with Local Server (Recommended)
```bash
# Using Python (if installed)
cd personal-health-mood-dashboard
python -m http.server 8000

# Or using Node.js (if installed)
npx http-server -p 8000

# Then open http://localhost:8000 in your browser
```

## 📁 Project Structure

```
personal-health-mood-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styles & animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Technologies Used

### Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Custom properties, animations, responsive design
- **JavaScript (ES6+)**: Modern JavaScript with classes and async/await
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Data visualization library
- **Font Awesome**: Icon library

### Key Features Demonstrated
- **Component Architecture**: Modular JavaScript classes
- **State Management**: Local storage for data persistence
- **Event Handling**: Interactive UI with smooth transitions
- **Data Visualization**: Charts and animated progress rings
- **Responsive Design**: Mobile-first approach
- **Theme System**: Dark/light mode implementation
- **Form Validation**: Multi-step form with data validation
- **Animation & Transitions**: CSS animations and JavaScript-driven effects

## 🎯 Core Functionality

### Daily Check-in Process
1. **Mood Selection**: Choose from 7 emoji-based mood options
2. **Energy & Sleep**: Rate energy levels and log sleep hours
3. **Stress & Activities**: Track stress levels and daily activities
4. **Notes & Summary**: Add personal notes and review check-in summary

### Wellness Score Calculation
The AI-powered wellness score considers:
- **Mood** (30% weight): Emoji-based emotional state
- **Energy** (25% weight): Self-reported energy levels (1-10)
- **Sleep** (25% weight): Hours of sleep with optimal range scoring
- **Stress** (20% weight): Inverted stress scale for positive impact

### Data Persistence
- **Local Storage**: All data stored locally in browser
- **Sample Data**: Pre-loaded with realistic sample entries
- **Export Ready**: Data structure supports easy backend integration

## 📊 Dashboard Components

### Quick Stats Cards
- Sleep Hours (with trend indicators)
- Mood Average (7-day rolling average)
- Habit Completion (daily progress)
- Current Streak (consecutive check-ins)

### Interactive Charts
- **Mood Distribution**: Pie chart showing mood patterns
- **Habit Completion**: Doughnut chart for daily habits

### Habit Tracker
- Visual habit completion status
- Category-based icons and colors
- Click-to-toggle completion

### AI Recommendations
- Personalized wellness suggestions
- Based on wellness score and recent patterns
- Context-aware advice

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6) for actions and highlights
- **Success**: Green (#10b981) for positive indicators
- **Warning**: Orange (#f59e0b) for attention items
- **Error**: Red (#ef4444) for errors

### Typography
- **Primary Font**: System font stack for performance
- **Hierarchy**: Clear heading structure with proper contrast

### Animations
- **Micro-interactions**: Button hover effects and transitions
- **Page Transitions**: Smooth modal animations
- **Progress Rings**: CSS-based animated wellness scores

## 🔧 Customization

### Adding New Habits
Edit the `loadSampleData()` function in `script.js` to add custom habits:

```javascript
const sampleHabits = [
    { id: 1, name: 'Your Custom Habit', completed: false, category: 'custom' },
    // ... more habits
];
```

### Modifying Wellness Score
Adjust the `calculateWellnessScore()` method to customize the algorithm:

```javascript
calculateWellnessScore() {
    // Your custom scoring logic here
    return customScore;
}
```

### Theme Customization
Modify CSS custom properties in `styles.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🚀 Performance Features

- **Lazy Loading**: Charts load only when needed
- **Efficient Re-renders**: Targeted DOM updates
- **Local Storage**: No server requests for data
- **Optimized CSS**: Minimal CSS with utility classes
- **Modern JavaScript**: ES6+ features for better performance

## 📈 Analytics & Insights

The dashboard provides:
- **Trend Analysis**: 7-day rolling averages
- **Pattern Recognition**: Mood and habit correlations
- **Progress Tracking**: Streak counters and completion rates
- **Personalized Insights**: AI-driven recommendations

## 🔒 Privacy & Security

- **Local Storage Only**: No data sent to external servers
- **Client-side Processing**: All calculations happen in browser
- **No Tracking**: No analytics or tracking scripts
- **Data Export**: Easy to backup or migrate data

## 🎯 Resume Highlights

This project demonstrates expertise in:

### Frontend Development
- ✅ Modern HTML5, CSS3, JavaScript
- ✅ Responsive web design
- ✅ Interactive UI/UX development
- ✅ Data visualization
- ✅ State management
- ✅ Local storage API

### UI/UX Design
- ✅ User-centered design
- ✅ Accessibility (ARIA labels, keyboard navigation)
- ✅ Mobile-first responsive design
- ✅ Dark/light theme implementation
- ✅ Smooth animations and transitions

### Technical Skills
- ✅ ES6+ JavaScript (classes, async/await, destructuring)
- ✅ CSS custom properties and animations
- ✅ Chart.js integration
- ✅ Local storage management
- ✅ Event-driven programming
- ✅ Modular code architecture

## 🚀 Future Enhancements

Potential improvements for advanced implementations:
- **Backend Integration**: Connect to REST API
- **User Authentication**: Multi-user support
- **Data Export**: CSV/PDF export functionality
- **Push Notifications**: Browser notifications
- **Progressive Web App**: Offline functionality
- **Advanced Analytics**: Trend analysis and predictions

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for showcasing modern frontend development skills**
