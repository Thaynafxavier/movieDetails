import { Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';

export const routes: Routes = [

  {
    path: '', redirectTo:'movie-page', pathMatch:'full'

  },

  {
    path: 'movie-page',
    component: MoviePageComponent
  },

];
