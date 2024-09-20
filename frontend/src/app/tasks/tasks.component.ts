import { Component } from '@angular/core';
import { Task } from '../task';
import { SchedulesService } from '../schedules.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { Subject } from 'rxjs';
import { debounceTime,distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {


  schedule_id : number = 0; 
  tasks : Task[] = [];
  newTaskDescription: string = '';
  private updateSubject = new Subject<{ task_id: number; content: string }>();  // Subject for debouncing updates 

  constructor(private route:ActivatedRoute,private taskService: TasksService){  }

  ngOnInit(){
    this.getTasks();

    

    // Debounce the updates with 300ms delay
    this.updateSubject.pipe(
      debounceTime(500),                 // Delay of 300ms
      distinctUntilChanged((prev, curr) => prev.content === curr.content)  // Ignore if content hasn't changed
    ).subscribe(({ task_id, content }) => {
      this.taskService.updateTask(this.schedule_id, task_id, content)
        .subscribe(() => {
          this.getTasks();  // Refresh the task list after the update
        });
    });
   // this.updateTask(task_id,content)});
  }

  sortTasksById(): void {
    this.tasks.sort((a, b) => a.id - b.id);
  }

  getTasks(){
    this.route.params.subscribe(params =>{
      this.schedule_id = params['id'];
      this.taskService.getTasksForSchedule(params['id']).subscribe((tasks)=>{
        this.tasks = tasks;
        this.sortTasksById();
    });  
    });
  }

  addTask() {
    if ( this.newTaskDescription.trim()) {
        this.taskService.createTask(this.schedule_id,this.newTaskDescription)
        .subscribe({
          next: () => {
              this.newTaskDescription='';
              this.getTasks();
          },
           error: (error) => {
              console.error('Error creating task', error);
            }
        })
     }
    }

  toggleTaskCompletion(task_id: number, is_completed:boolean) {
      this.taskService.updateStatus(this.schedule_id,task_id,is_completed).subscribe(()=>this.getTasks);
      }

  deleteTask( task_id: number) {
    this.taskService.deleteTask(this.schedule_id,task_id).subscribe(()=>this.getTasks())
  }
  updateTask(task_id: number,content: string){
    this.updateSubject.next({ task_id, content }); 
    //this.taskService.updateTask(this.schedule_id,task_id,content).subscribe(()=>{this.getTasks()})
  }
}
