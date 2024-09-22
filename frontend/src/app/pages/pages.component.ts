import { Component } from '@angular/core';
import { Page } from '../models/page';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PagesService } from '../services/pages.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {

  diary_id: number = -1;
  pages: Page[] = [];
  newPageContent: string = '';
  private updateSubject = new Subject<{ page_id: number; content: string }>();
  constructor(private route:ActivatedRoute,private pagesService: PagesService){  }

  ngOnInit(){
    this.getPages();

     this.updateSubject.pipe(
      debounceTime(500),                 
      distinctUntilChanged((prev, curr) => prev.content === curr.content)  
    ).subscribe(({ page_id, content }) => {
      this.pagesService.updatePage(this.diary_id, page_id, content)
        .subscribe(() => {
          this.getPages();  
        });
    });

  
  }

  checkForTodayPage(): boolean {
  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0));

  return this.pages.some(page => {
    const pageDate = new Date(page.date); 
    const pageDateStart = new Date(pageDate.setHours(0, 0, 0, 0)); 
    return this.isSameDay(pageDateStart, todayStart);
  });
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
  }


  sortPageByDate(){
  this.pages.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}


getPages(){
  this.route.params.subscribe(params =>{
    this.diary_id = params['id'];
    this.pagesService.getPagesForDiary(params['id']).subscribe((pages)=>{
      this.pages = pages;
      this.sortPageByDate();

      if(!this.checkForTodayPage()){
        this.createPage()
      }
  });  
  });
}

deletePage( page_id: number) {
  this.pagesService.deleteTask(this.diary_id,page_id).subscribe(()=>this.getPages())
}

updatePage(page_id: number,content: string){
  this.updateSubject.next({ page_id, content });
}

createPage(){
  this.pagesService.createPage(this.diary_id,'').subscribe(()=>this.getPages())
}
}
