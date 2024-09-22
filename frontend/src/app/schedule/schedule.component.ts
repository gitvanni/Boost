import { Component } from '@angular/core';
import { SchedulesService } from '../services/schedules.service';
import { Schedule } from '../models/schedule';
import { TasksComponent } from "../tasks/tasks.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TasksComponent,CommonModule,RouterOutlet,RouterLink,FormsModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  public schedules: Schedule[] = []
  newScheduleName: string = '';

  constructor(private schedulesService: SchedulesService){
      
  }

  ngOnInit(){
    this.getSchedules();
  }

  getSchedules(){
    this.schedulesService.getSchedules().subscribe((schedules)=>{
      this.schedules = schedules;
    })
  }

  deleteSchedule(schedule_id: number) {
    this.schedulesService.deleteSchedule(schedule_id).subscribe((schedule)=>{
      this.getSchedules();
    });
    }

    createSchedule(){
      if (this.newScheduleName.trim()) {
        this.schedulesService.createSchedule(this.newScheduleName)
          .subscribe({
            next: (response) => {
              this.newScheduleName = '';  
              this.getSchedules();
            },
            error: (error) => {
              console.error('Error creating schedule', error);
            }
          });
      } else {
        alert('Schedule name cannot be empty');
      }
    }
}
