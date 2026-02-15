import { Check, Trash2, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export const TaskList = ({ tasks, onToggleTask, onDeleteTask, selectedCategory, selectedDate }) => {
  const filteredTasks = tasks.filter(task => {
    const categoryMatch = selectedCategory === 'All' || task.category === selectedCategory;
    const dateMatch = !selectedDate || task.date === selectedDate;
    return categoryMatch && dateMatch;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        <p className="text-lg">No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
            task.completed ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggleTask(task.id)}
              className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.completed && <Check size={16} className="text-white" />}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 text-sm mt-1">{task.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {task.category}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {task.taskType === 'daily' ? 'Daily' : 'Monthly'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <Calendar size={12} />
                  {format(parseISO(task.date), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="flex-shrink-0 text-red-500 hover:text-red-700 transition p-2 rounded-md hover:bg-red-50"
              title="Delete task"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
