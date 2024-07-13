import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpService } from '../../../services/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';
import { Task } from '../../../shared/task.model';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe, PageTitleComponent, TaskListComponent], // Add ReactiveFormsModule to imports
  templateUrl: './all-task.component.html',
  styleUrls: ['./all-task.component.scss'],
})
export class AllTaskComponent {

  taskForm: FormGroup = new FormGroup({});
  intialTaskList: Task[] = [];
  taskList: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private stateService: StateService
  ) {}

  ngOnInit() {

    this.taskForm = this.fb.group({
      newTask: ['']
    });

    this.stateService.searchSubject.subscribe((value) => {
      console.log("search", value)
      if (value) {
        this.taskList = this.intialTaskList.filter((x) =>
          x.title.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        this.taskList = this.intialTaskList;
      }
    });

    this.getAllTasks();
  }

  addTask() {

    const newTask = this.taskForm.get('newTask')?.value;
    console.log('addTask', newTask);

    this.httpService.addTask(newTask).subscribe(() => {
    });
    this.taskForm.get('newTask')?.setValue('');
    this.getAllTasks();
  }

  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.intialTaskList = this.taskList = result;
    });
  }

  onComplete(task: Task) {

    console.log('complete', task);

    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  onImportant(task: Task) {

    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }
}