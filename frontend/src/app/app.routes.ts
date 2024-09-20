import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { TasksComponent } from './tasks/tasks.component';
import { DiaryComponent } from './diary/diary.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [{
    path:'home',
    component:HomeComponent
},
{
    path:'schedules',
    component: ScheduleComponent
},
{
    path: 'schedules/task/:id',
    component: TasksComponent
},
{
    path:'diaries',
    component: DiaryComponent
},
{
    path: 'diaries/pages/:id',
    component: PagesComponent
},
{
    path:'userhome',
    component: UserHomeComponent
},
{
    path:'',
    redirectTo: 'userhome',
    pathMatch: 'full'
},
{
    path:'**',
    component: NotFoundComponent
}];
