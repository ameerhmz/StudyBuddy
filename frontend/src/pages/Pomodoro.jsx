import React, { useState, useEffect, useRef } from 'react';
import { studySessionsAPI } from '../services/api';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('pomodoro');
  const [currentSession, setCurrentSession] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            completeSession();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, minutes, seconds]);

  const startSession = async () => {
    try {
      const duration = sessionType === 'pomodoro' ? 25 : sessionType === 'short_break' ? 5 : 15;
      const response = await studySessionsAPI.create({
        duration_minutes: duration,
        session_type: sessionType,
      });
      setCurrentSession(response.data);
      setIsActive(true);
    } catch (error) {
      console.error('Failed to start session:', error);
      setIsActive(true);
    }
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resetSession = () => {
    setIsActive(false);
    setCurrentSession(null);
    const duration = sessionType === 'pomodoro' ? 25 : sessionType === 'short_break' ? 5 : 15;
    setMinutes(duration);
    setSeconds(0);
  };

  const completeSession = async () => {
    setIsActive(false);
    
    if (currentSession) {
      try {
        await studySessionsAPI.complete(currentSession.id);
      } catch (error) {
        console.error('Failed to complete session:', error);
      }
    }
    
    // Auto switch to break or pomodoro
    if (sessionType === 'pomodoro') {
      setSessionType('short_break');
      setMinutes(5);
    } else {
      setSessionType('pomodoro');
      setMinutes(25);
    }
    setSeconds(0);
    setCurrentSession(null);
  };

  const changeSessionType = (type) => {
    setSessionType(type);
    setIsActive(false);
    setCurrentSession(null);
    const duration = type === 'pomodoro' ? 25 : type === 'short_break' ? 5 : 15;
    setMinutes(duration);
    setSeconds(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Pomodoro Timer
        </h1>

        {/* Session Type Selector */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => changeSessionType('pomodoro')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              sessionType === 'pomodoro'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => changeSessionType('short_break')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              sessionType === 'short_break'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => changeSessionType('long_break')}
            className={`flex-1 py-3 rounded-lg font-medium transition ${
              sessionType === 'long_break'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
            }`}
          >
            Long Break
          </button>
        </div>

        {/* Timer Display */}
        <div className="card text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 text-primary-600" />
          </div>
          <div className="text-8xl font-bold text-gray-900 dark:text-white">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <button
              onClick={startSession}
              className="btn btn-primary flex items-center space-x-2 px-8 py-4 text-lg"
            >
              <Play className="w-6 h-6" />
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={pauseSession}
              className="btn bg-yellow-600 text-white hover:bg-yellow-700 flex items-center space-x-2 px-8 py-4 text-lg"
            >
              <Pause className="w-6 h-6" />
              <span>Pause</span>
            </button>
          )}
          <button
            onClick={resetSession}
            className="btn btn-secondary flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Reset</span>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm">
            {sessionType === 'pomodoro'
              ? 'Focus time! Work on your tasks.'
              : 'Break time! Relax and recharge.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Pomodoro;
