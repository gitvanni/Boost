import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Page } from "../models/page";
import { environment } from "../../environments/environment.development";

@Injectable({
    providedIn: 'root'
  })
export class PagesService{
  constructor(private httpClient : HttpClient){}

  public getPagesForDiary(diary_id:number) : Observable<Page[]>{
    return this.httpClient.get<Page[]>(`${environment.url}/api/diary/${diary_id}/pages`);
  }

  public deleteTask(diary_id: number, page_id: number) : Observable<any>{
    return this.httpClient.delete(`${environment.url}/api/diary/${diary_id}/pages/${page_id}`)
}

  public createPage(diary_id :number,  content: string) : Observable<any>{
    const body = {
        content : content,
        date : new Date() 
    }
    return this.httpClient.post(`${environment.url}/api/diary/${diary_id}/pages`,body)
}

public updatePage(diary_id:number, page_id: number , content: string){
    const body = {
        content: content
    }
    return this.httpClient.put(`${environment.url}/api/diary/${diary_id}/pages/${page_id}`,body)
}

}