# 📚 StudyBuddy - AI-Powered Study Companion

![StudyBuddy Logo](https://img.shields.io/badge/StudyBuddy-Learning%20Platform-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)

> An intelligent, AI-powered study companion that helps students learn more effectively with interactive tools, real-time collaboration, and personalized assistance.

## 🌟 Features

### 🤖 AI-Powered Learning Assistant
- **Intelligent Chatbot**: Get instant help with study questions using Groq AI or local Ollama models
- **Smart Explanations**: Receive detailed explanations for complex topics
- **Study Tips**: Get personalized study strategies and time management advice

### 📝 Study Tools
- **Digital Notes**: Rich text editor with formatting tools for creating and organizing study notes
- **Flashcards**: Create and review flashcards for effective memorization
- **Pomodoro Timer**: Built-in focus timer with customizable work/break intervals

### 👥 Social Learning
- **Group Chat**: Real-time collaborative study sessions with peers
- **Add Friends**: Connect with other students for study partnerships
- **Study Groups**: Join or create study groups for collaborative learning

### 🎯 Interactive Features
- **Quiz Duel**: Challenge friends with interactive quizzes
- **Progress Tracking**: Monitor your study progress and achievements
- **Dashboard**: Personalized dashboard with study statistics and recommendations

### 📱 Mobile-First Design
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Touch-Friendly**: Intuitive touch interactions for mobile users
- **Offline Support**: Core features work without internet connection

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management
- **Framer Motion** - Smooth animations and transitions
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

### AI Integration
- **Groq API** - Fast AI inference for chat features
- **Ollama** - Local AI model support (optional)

### Additional Libraries
- **Tesseract.js** - OCR functionality for image text recognition
- **React YouTube** - YouTube video integration
- **Axios** - HTTP client for API calls

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **bun** package manager
- **Git** for version control

### Optional (for local AI features)
- **Ollama** - For running local AI models
- **qwen3:8b** model (if using Ollama)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ameerhmz/StudyBuddy.git
   cd StudyBuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Start the backend server** (in a separate terminal)
   ```bash
   npm run server
   # or
   bun run server
   ```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_GROQ_API_KEY` | API key for Groq AI services | Yes (for AI chat features) |

### AI Model Configuration

The app supports two AI backends:

1. **Groq API** (Cloud) - Faster, requires API key
2. **Ollama** (Local) - Private, requires local installation

To use Ollama:
1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull the qwen3:8b model: `ollama pull qwen3:8b`
3. Toggle "Use Local Model" in the chatbot settings

## 📖 Usage

### Getting Started
1. **Sign Up**: Create your account or log in
2. **Explore Features**: Navigate through different study tools
3. **Connect**: Add friends and join study groups
4. **Learn**: Use AI assistant for help with studies

### Key Workflows

#### 📝 Taking Notes
1. Go to the Notes page
2. Use the rich text editor to format your content
3. Save and organize your notes
4. Export as needed

#### 🧠 Creating Flashcards
1. Navigate to Flashcards
2. Add questions and answers
3. Review and study your cards
4. Track your progress

#### ⏰ Using Pomodoro Timer
1. Set your work and break intervals
2. Start the timer
3. Focus on your studies
4. Take scheduled breaks

#### 👥 Group Study
1. Create or join a study group
2. Chat with group members in real-time
3. Share resources and study together

## 🏗️ Project Structure

```
StudyBuddy/
├── public/                 # Static assets
├── src/
│   ├── Component/         # Reusable UI components
│   │   ├── AppLayout.jsx  # Main layout wrapper
│   │   ├── Navbar.jsx     # Navigation component
│   │   ├── Dashboard.jsx  # User dashboard
│   │   ├── Chatbot.jsx    # AI assistant
│   │   └── ...
│   ├── context/           # React context providers
│   │   └── AuthContext.jsx # Authentication state
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── About.jsx      # About page
│   │   ├── Features.jsx   # Features showcase
│   │   └── ...
│   ├── styles/            # Global styles and themes
│   │   ├── theme.css      # Design tokens
│   │   └── apple-theme.css # Apple-inspired theme
│   └── assets/            # Images and icons
├── server.js              # Backend server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#21d4fd to #b721ff)
- **Secondary**: Clean whites and grays
- **Accent**: Purple highlights

### Typography
- **Primary Font**: Inter (system font stack)
- **Headings**: Bold, clean typography
- **Body**: Readable sans-serif

### Components
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Framer Motion transitions
- **Responsive Grid**: Flexible layouts for all screens

## 🔒 Security

- **API Key Protection**: Sensitive keys stored in environment variables
- **Input Validation**: Client and server-side validation
- **CORS Configuration**: Secure cross-origin policies
- **Authentication**: User session management

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
```bash
npm run server
# Deploy to services like Heroku, Railway, or Vercel
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas (if needed for user data)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices
- Write clear, concise commit messages
- Test on multiple devices and browsers
- Ensure mobile responsiveness
- Maintain code quality with ESLint

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the fast build tool
- **Groq** for AI inference services
- **Ollama** for local AI capabilities
- **Open Source Community** for inspiration and tools

## 📞 Support

If you have any questions or need help:

- **Issues**: [GitHub Issues](https://github.com/ameerhmz/StudyBuddy/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ameerhmz/StudyBuddy/discussions)
- **Email**: ameerhmz5@gmail.com

---

**Happy Studying! 🎓**

*Made with ❤️ for students, by students*
