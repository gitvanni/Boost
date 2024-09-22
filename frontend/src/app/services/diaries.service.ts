import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Page } from "../models/page";
import { Diary } from "../models/diary";

@Injectable({
    providedIn: 'root'
  })
  export class DiariesService {
  
    constructor(private httpClient: HttpClient) { }
  
    public getDiaries() : Observable<Diary[]>{
      return this.httpClient.get<Diary[]>(`${environment.url}/api/diary`);
    }
  
    public getPagesForDiary(diary_id:number) : Observable<Page[]>{
      return this.httpClient.get<Page[]>(`${environment.url}/api/diary/${diary_id}/pages`);
    }
  
    public deleteDiary(diary_id:number) : Observable<any>{
      return this.httpClient.delete(`${environment.url}/api/diary/${diary_id}`);
    }
  
    public createDiary(title:string) :Observable<any>{
      const body = {
        title: title
      }
      return this.httpClient.post(`${environment.url}/api/diary`,body);
    }
  }