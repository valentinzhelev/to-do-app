# Angular Todo Application

## Overview
A simple todo list application built with Angular 17, demonstrating core Angular concepts and modern web development practices.

## Features Implemented
- ✅ Add new tasks with priority levels
- ✅ Mark tasks as completed
- ✅ Delete individual tasks
- ✅ Filter tasks (All, Active, Completed)
- ✅ Progress tracking with visual indicators
- ✅ Responsive design for mobile devices

## Angular Concepts Demonstrated

### Components
- **App Component**: Main application component
- **TodoItem Component**: Reusable component for individual tasks
- Demonstrates Input/Output decorators and component communication

### Services & Dependency Injection
- **TodoService**: Centralized data management
- Implements dependency injection pattern
- Uses Angular signals for reactive state management

### Pipes
- **DateFormatPipe**: Custom pipe for relative time formatting
- Shows "Just now", "2 hours ago", "3 days ago"

### Forms
- Two-way data binding with `[(ngModel)]`
- Form validation and user input handling
- Character counter for input fields

### Signals (Angular 17)
- Reactive programming with `signal()` and `computed()`
- Automatic UI updates when data changes
- Performance optimization through fine-grained reactivity

## Technical Stack
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: CSS3 with modern features (Grid, Flexbox, CSS Variables)
- **Build Tool**: Angular CLI

## Running the Application
```bash
npm install
ng serve
```
Open `http://localhost:4200` in your browser.

## Project Structure
```
src/app/
├── app.ts                 # Main application component
├── app.html              # Main template
├── app.css               # Global styles
├── todo.service.ts       # Data management service
├── date-format.pipe.ts   # Custom pipe
└── todo-item/
    └── todo-item.component.ts  # Task item component
```

## Learning Outcomes
This project demonstrates understanding of:
- Angular component architecture
- Service-based state management
- Reactive programming with signals
- Modern CSS and responsive design
- TypeScript best practices
- Clean code principles and separation of concerns

*Built for educational purposes - University Angular Course*
