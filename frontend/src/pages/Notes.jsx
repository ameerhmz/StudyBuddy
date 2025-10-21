import React, { useState, useEffect } from 'react';
import { notesAPI } from '../services/api';
import { Plus, Search, Trash2, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', tags: [] });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await notesAPI.getAll();
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNote) {
        await notesAPI.update(editingNote.id, formData);
      } else {
        await notesAPI.create(formData);
      }
      setFormData({ title: '', content: '', tags: [] });
      setEditingNote(null);
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.delete(id);
        fetchNotes();
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.content, tags: note.tags || [] });
    setShowForm(true);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">My Notes</h1>
        <button
          onClick={() => { setShowForm(!showForm); setEditingNote(null); setFormData({ title: '', content: '', tags: [] }); }}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Note</span>
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Note Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-6"
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Note Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input mb-4"
              required
            />
            <textarea
              placeholder="Note Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="input min-h-[200px]"
              required
            />
            <div className="flex space-x-2 mt-4">
              <button type="submit" className="btn btn-primary flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>{editingNote ? 'Update' : 'Create'} Note</span>
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingNote(null); }}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {note.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
              {note.content}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-500">
                {new Date(note.created_at).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {searchQuery ? 'No notes found' : 'No notes yet. Create your first note!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Notes;
