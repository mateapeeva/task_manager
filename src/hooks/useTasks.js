import { useState } from 'react';
import { db } from '../utils/db';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const data = db.getTasks();
    return data.tasks || [];
  });
  const [categories, setCategories] = useState(() => {
    const data = db.getTasks();
    return data.categories || [];
  });

  const addTask = (task) => {
    const newTask = db.addTask(task);
    setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const updateTask = (id, updates) => {
    const updated = db.updateTask(id, updates);
    if (updated) {
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    }
    return updated;
  };

  const deleteTask = (id) => {
    db.deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const addCategory = (category) => {
    if (category && !categories.includes(category)) {
      db.addCategory(category);
      setCategories(prev => [...prev, category]);
    }
  };

  return {
    tasks,
    categories,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    addCategory
  };
};
