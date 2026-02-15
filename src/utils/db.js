// Simple database using localStorage for task persistence

const DB_KEY = 'taskManagerDB';

export const db = {
  getTasks: () => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : { tasks: [], categories: ['Personal', 'Work', 'Health', 'Other'] };
  },

  saveTasks: (tasks) => {
    const data = db.getTasks();
    data.tasks = tasks;
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  addTask: (task) => {
    const data = db.getTasks();
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    data.tasks.push(newTask);
    localStorage.setItem(DB_KEY, JSON.stringify(data));
    return newTask;
  },

  updateTask: (id, updates) => {
    const data = db.getTasks();
    const index = data.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      data.tasks[index] = { ...data.tasks[index], ...updates };
      localStorage.setItem(DB_KEY, JSON.stringify(data));
      return data.tasks[index];
    }
    return null;
  },

  deleteTask: (id) => {
    const data = db.getTasks();
    data.tasks = data.tasks.filter(t => t.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  },

  getCategories: () => {
    const data = db.getTasks();
    return data.categories || [];
  },

  addCategory: (category) => {
    const data = db.getTasks();
    if (!data.categories.includes(category)) {
      data.categories.push(category);
      localStorage.setItem(DB_KEY, JSON.stringify(data));
    }
  }
};
