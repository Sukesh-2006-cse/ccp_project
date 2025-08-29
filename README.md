# PredicSure Frontend

AI-powered outage prediction system for urban utility management - Frontend Application

## 🎯 Overview

PredicSure is a comprehensive outage prediction system that uses AI/ML to forecast potential outages and risks across electricity, water supply, weather, and disaster management. This frontend application provides a modern, responsive interface for both utility authorities and citizens to access real-time predictions and alerts.

## ✨ Features

### Core Functionality
- **Multi-Utility Outage Prediction**: Electricity, water outage forecasting
- **Weather & Disaster Forecasting**: Real-time weather prediction and natural disaster risk assessment
- **AI/ML Insights**: Predictive analytics with anomaly detection and recommendations
- **Real-time Alerts**: Push notifications and dashboard alerts for administrators
- **Multi-language Support**: English, Tamil, Hindi, Spanish, and French

### User Interface
- **Responsive Design**: Mobile-first approach with PWA support
- **Modern UI/UX**: Clean, intuitive interface built with Tailwind CSS
- **Interactive Charts**: Real-time data visualization using Recharts
- **Role-based Access**: Different interfaces for administrators, managers, and operators

## 🏗️ Tech Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation

### Styling & UI
- **Tailwind CSS** for utility-first styling
- **Lucide React** for beautiful icons
- **Recharts** for data visualization

### State Management
- **React Context API** for authentication and global state
- **Local Storage** for session persistence

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** with Autoprefixer

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd predicsure-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header with navigation
│   ├── Layout.tsx      # Main layout wrapper
│   └── Sidebar.tsx     # Navigation sidebar
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Predictions.tsx # AI predictions view
│   ├── Alerts.tsx      # Alerts management
│   ├── Settings.tsx    # User settings
│   └── Login.tsx       # Authentication page
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🔐 Authentication

The application includes a mock authentication system for development:

- **Demo Credentials**:
  - Email: `admin@predicsure.com`
  - Password: `password123`

- **Features**:
  - JWT token-based authentication
  - Role-based access control
  - Session persistence
  - Protected routes

## 📱 PWA Support

The application is configured as a Progressive Web App with:

- Service worker support
- Offline capabilities
- Install prompt
- Responsive design for all devices

## 🎨 Customization

### Colors
The application uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue shades for main actions
- **Secondary**: Green shades for success states
- **Danger**: Red shades for alerts and errors
- **Warning**: Yellow/Orange shades for warnings

### Components
All UI components use Tailwind CSS classes and can be easily customized by modifying the CSS classes or extending the Tailwind configuration.

## 📊 Data Visualization

The application uses Recharts for data visualization:

- **Line Charts**: For time-series data (outage trends, predictions)
- **Pie Charts**: For distribution data (prediction accuracy)
- **Bar Charts**: For comparison data (model performance)

## 🌐 Internationalization

Multi-language support is built into the application:

- **Supported Languages**: English, Tamil, Hindi, Spanish, French
- **Language Selection**: Available in user settings
- **Localization Ready**: Infrastructure in place for easy translation addition

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Conventional commits** for commit messages

## 🚀 Deployment

### Build Process

1. **Install dependencies**: `npm install`
2. **Build application**: `npm run build`
3. **Deploy contents** of `dist/` directory to your web server

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your-api-url
VITE_APP_NAME=PredicSure
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time WebSocket** integration for live updates
- **Advanced Analytics** dashboard
- **Mobile App** development
- **AI Model Integration** with backend
- **Advanced Notifications** system
- **Data Export** functionality
- **API Documentation** integration

---

**PredicSure** - Making cities smarter, safer, and more resilient through AI-powered outage prediction.
