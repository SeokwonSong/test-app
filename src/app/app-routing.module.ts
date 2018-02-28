import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { PostsComponent } from './posts/posts.component';
import { TestComponent } from './test/test.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'test', component: TestComponent },
  { path: 'calender', component: CalendarComponent },
  { path: 'upload', component: UploadComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
