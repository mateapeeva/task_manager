import { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Calendar } from './components/Calendar';
import { FilterBar } from './components/FilterBar';
import { ListTodo, CalendarDays } from 'lucide-react';

function App() {
  const { tasks, categories, addTask, toggleTask, deleteTask, addCategory } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  const taskCounts = {
    all: tasks.length,
    ...categories.reduce((acc, cat) => {
      acc[cat] = tasks.filter(t => t.category === cat).length;
      return acc;
    }, {})
  };

  const handleDateSelect = (date) => {
    setSelectedDate(selectedDate === date ? null : date);
    setView('list');
  };

  const handleClearDateFilter = () => {
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Task Manager</h1>
          <p className="text-gray-600">Organize your daily and monthly tasks efficiently</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
            <button
              onClick={() => setView('list')}
              className={`px-6 py-2 rounded-md transition font-medium flex items-center gap-2 ${
                view === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ListTodo size={20} />
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-6 py-2 rounded-md transition font-medium flex items-center gap-2 ${
                view === 'calendar'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CalendarDays size={20} />
              Calendar View
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Task Form and Filters */}
            <div className="lg:col-span-1">
              <TaskForm
                categories={categories}
                onAddTask={addTask}
                onAddCategory={addCategory}
              />
            </div>

            {/* Right Column - Task List */}
            <div className="lg:col-span-2">
              {selectedDate && (
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-4 flex justify-between items-center">
                  <p className="text-blue-800">
                    Showing tasks for: <strong>{selectedDate}</strong>
                  </p>
                  <button
                    onClick={handleClearDateFilter}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
              <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                taskCounts={taskCounts}
              />
              <TaskList
                tasks={tasks}
                onToggleTask={toggleTask}
                onDeleteTask={deleteTask}
                selectedCategory={selectedCategory}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <Calendar
              tasks={tasks}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Built with React, Tailwind CSS, and localStorage</p>
        </div>
      </div>
    </div>
  );
}

export default App;
