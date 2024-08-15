import { Routes } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
  { path: 'movie-page/:movieId', component: MoviePageComponent },
  { path: 'error', component: ErrorPageComponent },
];
