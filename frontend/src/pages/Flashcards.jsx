import React, { useState, useEffect } from 'react';
import { flashcardsAPI } from '../services/api';
import { Plus, RotateCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ question: '', answer: '', category: '', difficulty: 'medium' });
  const [studyMode, setStudyMode] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await flashcardsAPI.getAll();
      setFlashcards(response.data);
    } catch (error) {
      console.error('Failed to fetch flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await flashcardsAPI.create(formData);
      setFormData({ question: '', answer: '', category: '', difficulty: 'medium' });
      setShowForm(false);
      fetchFlashcards();
    } catch (error) {
      console.error('Failed to create flashcard:', error);
    }
  };

  const startStudy = () => {
    if (flashcards.length > 0) {
      setCurrentCard(flashcards[0]);
      setStudyMode(true);
      setFlipped(false);
    }
  };

  const handleReview = async (correct) => {
    if (!currentCard) return;
    
    try {
      await flashcardsAPI.review(currentCard.id, correct);
      const currentIndex = flashcards.findIndex((c) => c.id === currentCard.id);
      if (currentIndex < flashcards.length - 1) {
        setCurrentCard(flashcards[currentIndex + 1]);
        setFlipped(false);
      } else {
        setStudyMode(false);
        fetchFlashcards();
      }
    } catch (error) {
      console.error('Failed to record review:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (studyMode && currentCard) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Study Mode</h2>
        
        <div
          className="w-full max-w-2xl h-96 cursor-pointer perspective-1000"
          onClick={() => setFlipped(!flipped)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? 'answer' : 'question'}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card h-full flex items-center justify-center text-center"
            >
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {flipped ? 'Answer' : 'Question'}
                </p>
                <p className="text-2xl text-gray-900 dark:text-white">
                  {flipped ? currentCard.answer : currentCard.question}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex space-x-4 mt-8"
          >
            <button
              onClick={() => handleReview(false)}
              className="btn bg-red-600 text-white hover:bg-red-700 flex items-center space-x-2"
            >
              <ThumbsDown className="w-5 h-5" />
              <span>Incorrect</span>
            </button>
            <button
              onClick={() => handleReview(true)}
              className="btn bg-green-600 text-white hover:bg-green-700 flex items-center space-x-2"
            >
              <ThumbsUp className="w-5 h-5" />
              <span>Correct</span>
            </button>
          </motion.div>
        )}

        <button
          onClick={() => setStudyMode(false)}
          className="mt-8 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          Exit Study Mode
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
        <div className="flex space-x-2">
          {flashcards.length > 0 && (
            <button onClick={startStudy} className="btn bg-green-600 text-white hover:bg-green-700 flex items-center space-x-2">
              <RotateCw className="w-5 h-5" />
              <span>Study Now</span>
            </button>
          )}
          <button onClick={() => setShowForm(!showForm)} className="btn btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Flashcard</span>
          </button>
        </div>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="card mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="input"
              required
            />
            <textarea
              placeholder="Answer"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              className="input min-h-[100px]"
              required
            />
            <div className="flex space-x-2">
              <button type="submit" className="btn btn-primary">Create Flashcard</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((card) => (
          <motion.div key={card.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Q: {card.question}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">A: {card.answer}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Reviewed: {card.times_reviewed} times</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < card.mastery_level ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {flashcards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No flashcards yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
