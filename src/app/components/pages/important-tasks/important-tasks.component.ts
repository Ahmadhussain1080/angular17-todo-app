import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../services/http.service';
import { Task } from '../../../shared/task.model';

@Component({
  selector: 'app-important-tasks',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './important-tasks.component.html',
  styleUrl: './important-tasks.component.scss',
})

export class ImportantTasksComponent {

  newTask = "";
  taskList: Task[] = [];
  
  constructor(
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.taskList = result.filter((x: any) => x.important == true);
    })
  }

  onComplete(task: Task) {
    
    console.log("complete", task)

    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    })
  }

  onImportant(task: Task) {
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    })
  }
}
