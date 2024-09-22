import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DiariesService } from '../services/diaries.service';
import { Diary } from '../models/diary';

@Component({
  selector: 'app-diary',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent {
  diaries: Diary[] = [];
  newDiary: string ='';
  constructor(private diaryService: DiariesService){}

  
  ngOnInit(){
    this.getDiaries();
  }

  getDiaries(){
    this.diaryService.getDiaries().subscribe((diaries)=>{
      this.diaries = diaries;
    })
  }

  deleteDiary(diary_id: number) {
    this.diaryService.deleteDiary(diary_id).subscribe((diary)=>{
      this.getDiaries();
    });
    }

    addDiary(){
      if (this.newDiary.trim()) {
        this.diaryService.createDiary(this.newDiary)
          .subscribe({
            next: (response) => {
              this.newDiary = ''; 
              this.getDiaries();
            },
            error: (error) => {
              console.error(error.message);
            }
          });
      } else {
        alert('Diary name cannot be empty');
      }
    }
}
