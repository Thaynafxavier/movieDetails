import { CommonModule } from '@angular/common';
import { Component, ModuleWithProviders, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MovieResponse } from '../../typings/movie-response';
import { MovieService } from '../../services/movie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [ NgCircleProgressModule,    CommonModule
 ],
 providers: [
  (NgCircleProgressModule.forRoot({
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: '#78C000',
    innerStrokeColor: '#C7E596',
    animationDuration: 300,

  }) as ModuleWithProviders<NgCircleProgressModule>).providers!,
],

  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss'
})

  export class MoviePageComponent implements OnInit {
    movie: MovieResponse | null = null;

    constructor(
      private movieService: MovieService,
      private route: ActivatedRoute 
    ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const movieId = params.get('movieId');
        console.log(params.keys)
        if (movieId) {
          this.movieService.getMovieDetails(Number(movieId)).subscribe(
            (data) => {
              this.movie = data;
              console.log('Movie details:', this.movie);
            },
            (error) => {
              console.error('Erro ao obter detalhes do filme', error);
            }
          );
        }
      });
    }

    getPosterUrl(): string {
      const baseUrl = 'https://image.tmdb.org/t/p/original';
      return this.movie ? `${baseUrl}${this.movie.poster_path}` : '';
    }
  }
