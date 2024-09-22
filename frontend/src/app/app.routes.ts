import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { TasksComponent } from './tasks/tasks.component';
import { DiaryComponent } from './diary/diary.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [{
    path:'home',
    component:HomeComponent
},
{
    path:'userhome',
    component: UserHomeComponent,
    canActivate: [AuthGuard]
},
{
    path:'schedules',
    component: ScheduleComponent,
    canActivate: [AuthGuard]
},
{
    path: 'schedules/task/:id',
    component: TasksComponent,
    canActivate: [AuthGuard]
},
{
    path:'diaries',
    component: DiaryComponent,
    canActivate: [AuthGuard]
},
{
    path: 'diaries/pages/:id',
    component: PagesComponent,
    canActivate: [AuthGuard]
},
{
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
},
{
    path:'**',
    component: NotFoundComponent
}];
