import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})

export class TaskListComponent {

  @Input() taskList: Task[] = [];
  @Output() important = new EventEmitter<Task>();
  @Output() complete = new EventEmitter<Task>();

  toggleImportant(task: Task) {
    task.important = !task.important;
    this.important.emit(task);
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.complete.emit(task);
  }
}
