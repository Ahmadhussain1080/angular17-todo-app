import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../shared/task.model';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private allTasks: Task[] = [
    { id: 1, title: 'Complete project report', completed: false, important: false },
    { id: 2, title: 'Review code for module A', completed: true, important: true },
    { id: 3, title: 'Prepare presentation slides', completed: false, important: false },
    { id: 4, title: 'Update user documentation', completed: true, important: false },
    { id: 5, title: 'Fix bug in authentication service', completed: false, important: false },
    { id: 6, title: 'Refactor data processing module', completed: true, important: false },
    { id: 7, title: 'Write unit tests for new features', completed: false, important: false },
    { id: 8, title: 'Deploy application to staging', completed: true, important: true },
    { id: 9, title: 'Conduct user acceptance testing', completed: false, important: false },
    { id: 10, title: 'Optimize database queries', completed: true, important: true },
    { id: 11, title: 'Update project roadmap', completed: false, important: false },
    { id: 12, title: 'Organize team meeting', completed: true, important: false },
    { id: 13, title: 'Review pull requests', completed: false, important: true },
    { id: 14, title: 'Plan sprint tasks', completed: true, important: false },
    { id: 15, title: 'Document API endpoints', completed: false, important: false }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.allTasks);

  httpClient = inject(HttpClient);

  constructor(
  ) {}

  setTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: string) {

    this.allTasks.push({
      id: this.allTasks.length + 1,
      title: task,
      completed: false,
      important: false
    });

    this.setTasks(this.allTasks);
    // return this.httpClient.post("http://localhost:3000/tasks", {
    //   title: task
    // });
    return this.getAllTasks();
    
  }

  getAllTasks() {
    //  return this.httpClient.get("http://localhost:3000/tasks");
    return this.getTasks();
  }

  updateTask(task: Task) {
    // return this.httpClient.put("http://localhost:3000/tasks/" + task.id, task);
    return this.getTasks();
  }
}