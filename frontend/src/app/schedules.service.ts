import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from './schedule';
import { environment } from '../environments/environment.development';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private httpClient: HttpClient) { }

  public getSchedules() : Observable<Schedule[]>{
    return this.httpClient.get<Schedule[]>(`${environment.url}/api/schedules`);
  }

  public getTasksForSchedule(schedule_id:number) : Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${environment.url}/api/schedules/${schedule_id}/tasks`);
  }

  public deleteSchedule(schedule_id:number) : Observable<any>{
    return this.httpClient.delete(`${environment.url}/api/schedules/${schedule_id}`);
  }

  public createSchedule(name:string) :Observable<any>{
    const body = {
      user_id: 1,
      name: name
    }
    return this.httpClient.post(`${environment.url}/api/schedules`,body);
  }
}
