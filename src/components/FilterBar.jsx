import { Filter } from 'lucide-react';

export const FilterBar = ({ categories, selectedCategory, onSelectCategory, taskCounts }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filter by Category</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-4 py-2 rounded-full transition font-medium ${
            selectedCategory === 'All'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All ({taskCounts.all || 0})
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full transition font-medium ${
              selectedCategory === category
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category} ({taskCounts[category] || 0})
          </button>
        ))}
      </div>
    </div>
  );
};
