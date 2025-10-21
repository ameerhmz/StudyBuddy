import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 text-xl font-bold text-primary-600 dark:text-primary-400 mb-4">
              <BookOpen className="w-6 h-6" />
              <span>StudyBuddy</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your AI-powered study companion for better learning and productivity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Study Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/notes" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm">
                  Notes
                </Link>
              </li>
              <li>
                <Link to="/flashcards" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm">
                  Flashcards
                </Link>
              </li>
              <li>
                <Link to="/pomodoro" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition text-sm">
                  Pomodoro Timer
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ameerhmz/StudyBuddy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:ameerhmz5@gmail.com"
                className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2025 StudyBuddy. Made with ❤️ for students, by students.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
