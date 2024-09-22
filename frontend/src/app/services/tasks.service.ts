import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
  })
export class TasksService{
    constructor(private httpClient: HttpClient) { }

    public getTasksForSchedule(schedule_id:number) : Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${environment.url}/api/schedules/${schedule_id}/tasks`);
      }

    public deleteTask(schedule_id: number, task_id: number) : Observable<any>{
        return this.httpClient.delete(`${environment.url}/api/schedules/${schedule_id}/tasks/${task_id}`)
    }

    public createTask(schedule_id:number,  description: string) : Observable<any>{
        const body = {
            description : description
        }
        return this.httpClient.post(`${environment.url}/api/schedules/${schedule_id}/tasks`,body)
    }

    public updateTask(schedule_id:number, task_id: number , content: string){
        const body = {
            description: content
        }
        return this.httpClient.put(`${environment.url}/api/schedules/${schedule_id}/tasks/${task_id}?update=content`,body)
    }
    
    public updateStatus(schedule_id:number, task_id: number,is_completed: boolean ): Observable<any>{
        const body = {
            is_completed: is_completed
        }
        return this.httpClient.put(`${environment.url}/api/schedules/${schedule_id}/tasks/${task_id}?update=status`,body)
    }
    
}