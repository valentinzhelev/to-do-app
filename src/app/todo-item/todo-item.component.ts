import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../date-format.pipe';
import { Todo } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFormatPipe],
  template: `
    <div class="todo-item" [class.completed]="todo.completed" [class.priority-high]="todo.priority === 'high'" [class.priority-medium]="todo.priority === 'medium'" [class.priority-low]="todo.priority === 'low'">
      <div class="todo-content">
        <div class="todo-header">
          <input 
            type="checkbox" 
            [checked]="todo.completed"
            (change)="onToggle()"
            class="todo-checkbox"
          >
          <span class="todo-text">{{ todo.text }}</span>
          <div class="priority-badge" [class]="'priority-' + todo.priority">
            {{ todo.priority }}
          </div>
        </div>
        <div class="todo-meta">
          <span class="todo-date">{{ todo.createdAt | dateFormat }}</span>
          <div class="priority-selector">
            <select [value]="todo.priority" (change)="onPriorityChange($event)" class="priority-select">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>
      <div class="todo-actions">
        <button (click)="onDelete()" class="delete-btn" title="Delete task">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .todo-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #e0e0e0;
      transition: all 0.3s ease;
      margin-bottom: 12px;
    }

    .todo-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .todo-item.completed {
      opacity: 0.7;
      background: #f8f9fa;
    }

    .todo-item.priority-high {
      border-left-color: #dc3545;
    }

    .todo-item.priority-medium {
      border-left-color: #ffc107;
    }

    .todo-item.priority-low {
      border-left-color: #28a745;
    }

    .todo-content {
      flex: 1;
    }

    .todo-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .todo-checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #007bff;
    }

    .todo-text {
      flex: 1;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }

    .todo-item.completed .todo-text {
      text-decoration: line-through;
      color: #6c757d;
    }

    .priority-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .priority-badge.priority-high {
      background: #dc3545;
      color: white;
    }

    .priority-badge.priority-medium {
      background: #ffc107;
      color: #212529;
    }

    .priority-badge.priority-low {
      background: #28a745;
      color: white;
    }

    .todo-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #6c757d;
    }

    .todo-date {
      font-style: italic;
    }

    .priority-select {
      padding: 4px 8px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 12px;
      background: white;
    }

    .todo-actions {
      display: flex;
      gap: 8px;
    }

    .delete-btn {
      padding: 8px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .delete-btn:hover {
      background: #c82333;
      transform: scale(1.05);
    }

    @media (max-width: 480px) {
      .todo-item {
        flex-direction: column;
        align-items: stretch;
      }
      
      .todo-header {
        flex-wrap: wrap;
      }
      
      .todo-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `]
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() priorityChange = new EventEmitter<{id: number, priority: 'low' | 'medium' | 'high'}>();

  onToggle() {
    this.toggle.emit(this.todo.id);
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }

  onPriorityChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.priorityChange.emit({
      id: this.todo.id,
      priority: select.value as 'low' | 'medium' | 'high'
    });
  }
}
