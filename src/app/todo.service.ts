import { Injectable, signal } from '@angular/core';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todos = signal<Todo[]>([]);

  getTodos() {
    return this.todos.asReadonly();
  }

  addTodo(text: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      priority
    };
    this.todos.update(todos => [...todos, newTodo]);
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  updateTodoPriority(id: number, priority: 'low' | 'medium' | 'high') {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  }

  getCompletedCount() {
    return this.todos().filter(todo => todo.completed).length;
  }

  getTotalCount() {
    return this.todos().length;
  }

  clearCompleted() {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
  }
}
