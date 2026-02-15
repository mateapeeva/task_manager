import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  addMonths, 
  subMonths,
  isSameMonth,
  isSameDay
} from 'date-fns';

export const Calendar = ({ tasks, onDateSelect, selectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd');
        const cloneDay = day;
        const dayTasks = tasks.filter(task => task.date === formattedDate);
        const isSelected = selectedDate === formattedDate;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
          <button
            key={day.toString()}
            onClick={() => onDateSelect(formattedDate)}
            className={`
              min-h-[80px] p-2 border rounded-lg transition
              ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'}
              ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
              ${isToday && !isSelected ? 'border-blue-500 border-2' : 'border-gray-200'}
            `}
          >
            <div className="text-sm font-semibold mb-1">
              {format(cloneDay, 'd')}
            </div>
            {dayTasks.length > 0 && (
              <div className="space-y-1">
                {dayTasks.slice(0, 2).map((task, idx) => (
                  <div
                    key={idx}
                    className={`text-xs truncate px-1 py-0.5 rounded ${
                      task.completed
                        ? 'bg-gray-200 text-gray-600 line-through'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{dayTasks.length - 2} more
                  </div>
                )}
              </div>
            )}
          </button>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Calendar</h2>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
