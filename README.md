# Task Manager

A modern, responsive web application for managing daily and monthly tasks. Built with React, Tailwind CSS, and localStorage for data persistence.

## Features

- ✅ **Task Management**: Create, complete, and delete tasks
- 📅 **Daily & Monthly Tasks**: Organize tasks by type
- 🗂️ **Categories**: Filter tasks by customizable categories (Personal, Work, Health, etc.)
- 📆 **Calendar View**: Visual monthly calendar showing tasks on specific dates
- 📋 **List View**: Detailed task list with filtering options
- 💾 **Local Storage**: All data persists in browser localStorage
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔍 **Date Filtering**: Click calendar dates to filter tasks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mateapeeva/task_manager.git
cd task_manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Adding a Task

1. Fill in the task title (required)
2. Add an optional description
3. Select a category or create a new one
4. Choose task type (Daily or Monthly)
5. Select a date
6. Click "Add Task"

### Managing Tasks

- **Complete Task**: Click the circle checkbox next to a task
- **Delete Task**: Click the trash icon
- **Filter by Category**: Click category buttons to filter tasks
- **Filter by Date**: Switch to Calendar View and click on a date

### Views

- **List View**: Shows all tasks in a list format with filtering options
- **Calendar View**: Displays tasks on a monthly calendar

## Technology Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 7
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Database**: localStorage (browser-based)

## Browser Support

Works in all modern browsers with localStorage support:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

MIT License - feel free to use this project for personal or commercial purposes.
