import { Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';

export const routes: Routes = [
  { path: 'movie-page/:movieId', component: MoviePageComponent },
];
