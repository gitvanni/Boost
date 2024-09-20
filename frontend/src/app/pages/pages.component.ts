import { Component } from '@angular/core';
import { Page } from '../page';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PagesService } from '../pages.service';
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

  

     // Debounce the updates with 300ms delay
     this.updateSubject.pipe(
      debounceTime(500),                 // Delay of 300ms
      distinctUntilChanged((prev, curr) => prev.content === curr.content)  // Ignore if content hasn't changed
    ).subscribe(({ page_id, content }) => {
      this.pagesService.updateTask(this.diary_id, page_id, content)
        .subscribe(() => {
          this.getPages();  // Refresh the task list after the update
        });
    });

  
  }

  checkForTodayPage(): boolean {
     // Get today's date
  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0));

  // Check if any page in the array has today's date
  return this.pages.some(page => {
    // Convert the page date string to a Date object
    const pageDate = new Date(page.date); // Assumes page.date is in 'YYYY-MM-DD' format
    const pageDateStart = new Date(pageDate.setHours(0, 0, 0, 0)); // Normalize the page date
    console.log(pageDate)
    console.log(todayStart)
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

      if(this.checkForTodayPage()){
     
      }else{
        this.createPage()
        console.log("no pages for this day")
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
