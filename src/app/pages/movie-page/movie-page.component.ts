import { CommonModule, DatePipe } from '@angular/common';
import { Component, ModuleWithProviders, OnInit } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {
  ApiResponse,
  CastMember,
  CreditsResponse,
  CrewMember,
  Genre,
  MovieResponse,
  Recommendation,
  RecommendationsResponse,
  ReleaseInfo,
  Translation,
  TranslationData,
  VideosResponse,
} from '../../typings/movie-response';
import { MovieService } from '../../services/movie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading-service';

const genreTranslations: { [key: string]: string } = {
  Action: 'Ação',
  Adventure: 'Aventura',
  Comedy: 'Comédia',
  Science_Fiction: 'Ficção Científica',
  'Science Fiction': 'Ficção Científica',
  Drama: 'Drama',
  Fantasy: 'Fantasia',
  Horror: 'Terror',
  Romance: 'Romance',
  Thriller: 'Suspense',
  Animation: 'Animação',
  Mystery: 'Mistério',
  Family: 'Família',
};

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [
    NgCircleProgressModule,
    CommonModule,
    SafeUrlPipe,
    MatProgressSpinnerModule,
  ],
  providers: [
    DatePipe,
    (
      NgCircleProgressModule.forRoot({
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: '#78C000',
        innerStrokeColor: '#C7E596',
        animationDuration: 300,
      }) as ModuleWithProviders<NgCircleProgressModule>
    ).providers!,
  ],

  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent implements OnInit {
  movie: MovieResponse | null = null;
  classification: string | null = null;
  releaseDate: string | null = null;
  country: string | null = null;
  writers: string[] = [];
  directors: string | null = null;
  cast: CastMember[] = [];
  selectedLanguage: string = 'pt';
  translations: TranslationData | null = null;
  trailerUrl: string = '';
  hasTrailer: boolean = false;
  noTrailerImageUrl: string = 'assets/images/video-indisponivel-image.png';
  recommendations: Recommendation[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('movieId');
      if (movieId) {
        this.loadMovieDetails(Number(movieId));
      }
    });
  }

  loadMovieDetails(movieId: number): void {
    this.loadingService.show();

    this.movieService.getMovieDetails(movieId).subscribe({
      next: (response) => {
        this.movie = response;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Erro ao obter detalhes do filme:', err);
        this.loadingService.hide();

        this.router.navigate(['/error']);
      },
    });

    this.movieService.getMovieCredits(movieId).subscribe(
      (credits: CreditsResponse) => {
        this.extractRelevantNames(credits);
        this.cast = credits.cast;
      },
      (error) => {
        console.error('Erro ao obter os créditos do filme', error);
      }
    );

    this.movieService.getReleaseDates(movieId).subscribe(
      (data: ApiResponse) => {
        const countryData = data.results.find(
          (item) => item.iso_3166_1 === 'BR'
        );
        if (countryData) {
          const brReleaseDate = countryData.release_dates.find(
            (date) => date.type === 3
          );
          if (brReleaseDate) {
            this.classification = brReleaseDate.certification;
            this.releaseDate = this.formatDate(brReleaseDate.release_date);
            this.country = countryData.iso_3166_1;
          }
        }
      },
      (error) => {
        console.error('Erro ao obter as datas de lançamento', error);
      }
    );

    this.movieService.getMovieVideos(movieId).subscribe(
      (response: VideosResponse) => {
        const trailer = response.results.find(
          (video) =>
            video.type === 'Trailer' &&
            video.site === 'YouTube' &&
            video.official
        );
        if (trailer) {
          this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
          this.hasTrailer = true;
        } else {
          this.hasTrailer = false;
        }
      },
      (error) => {
        console.error('Erro ao obter os vídeos do filme', error);
        this.hasTrailer = false;
      }
    );

    this.movieService.getMovieRecommendations(movieId).subscribe(
      (response: RecommendationsResponse) => {
        this.recommendations = response.results.slice(0, 6);
      },
      (error) => {
        console.error('Erro ao obter recomendações do filme', error);
      }
    );

    this.loadTranslations(movieId);
  }

  loadTranslations(movieId: number): void {
    this.movieService.getMovieTranslations(movieId).subscribe(
      (data) => {
        const translation = data.translations.find(
          (t: Translation) => t.iso_639_1 === this.selectedLanguage
        );
        this.translations = translation ? translation.data : null;
        console.log('Translations:', this.translations);
      },
      (error) => {
        console.error('Erro ao obter traduções do filme', error);
      }
    );
  }

  getTitle(): string {
    return (
      this.translations?.title || this.movie?.title || 'Título não disponível'
    );
  }

  getOverview(): string {
    return (
      this.translations?.overview ||
      this.movie?.overview ||
      'Descrição não disponível'
    );
  }

  extractRelevantNames(credits: CreditsResponse): void {
    this.writers = credits.crew
      .filter((member) => member.known_for_department === 'Writing')
      .map((member) => member.name)
      .slice(0, 4);

    const director = credits.crew.find(
      (member) => member.known_for_department === 'Directing'
    );
    this.directors = director ? director.name : null;
  }

  getPosterUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/original';
    const defaultImageUrl = 'assets/images/question-image.png'; // Caminho para a imagem padrão
    return this.movie && this.movie.poster_path ? `${baseUrl}${this.movie.poster_path}` : defaultImageUrl;
  }


  getActorImageUrl(profilePath: string | null): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w200';
    const defaultImageUrl = 'assets/images/question-image.png';
    return profilePath ? `${baseUrl}${profilePath}` : defaultImageUrl;
  }



getImageUrl(path: string | null): string {
  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const defaultImageUrl = 'assets/images/question-image.png'; // Caminho para a imagem padrão
  return path ? `${baseUrl}${path}` : defaultImageUrl;
}

  formatDate(dateStr: string): string | null {
    const date = new Date(dateStr);
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  formatGenres(genres: Genre[] | undefined): string {
    if (!genres) return '';
    return genres
      .map((genre) => genreTranslations[genre.name] || genre.name)
      .join(', ');
  }

  formatRuntime(minutes: number | undefined): string {
    if (minutes === undefined) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}
