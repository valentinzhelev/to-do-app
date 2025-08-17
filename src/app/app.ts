import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService, Todo } from './todo.service';
import { TodoItemComponent } from './todo-item/todo-item.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, TodoItemComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('📝 Smart Todo App');
  protected newTodoText = '';
  protected selectedPriority: 'low' | 'medium' | 'high' = 'medium';
  protected filterStatus: 'all' | 'active' | 'completed' = 'all';

  constructor(private todoService: TodoService) {}

  protected get todos() {
    return this.todoService.getTodos();
  }

  protected get completedCount() {
    return computed(() => this.todoService.getCompletedCount());
  }

  protected get totalCount() {
    return computed(() => this.todoService.getTotalCount());
  }

  protected get progressPercentage() {
    return computed(() => {
      const total = this.totalCount();
      return total > 0 ? Math.round((this.completedCount() / total) * 100) : 0;
    });
  }

  protected get filteredTodos() {
    return computed(() => {
      const todos = this.todos();
      switch (this.filterStatus) {
        case 'active':
          return todos.filter(todo => !todo.completed);
        case 'completed':
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    });
  }

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todoService.addTodo(this.newTodoText, this.selectedPriority);
      this.newTodoText = '';
      this.selectedPriority = 'medium';
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  updatePriority(data: {id: number, priority: 'low' | 'medium' | 'high'}) {
    this.todoService.updateTodoPriority(data.id, data.priority);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  setFilter(status: 'all' | 'active' | 'completed') {
    this.filterStatus = status;
  }
}
