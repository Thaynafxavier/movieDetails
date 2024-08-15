import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ApiResponse,
  CreditsResponse,
  MovieResponse,
  MovieTranslationsResponse,
  RecommendationsResponse,
  VideosResponse,
} from '../typings/movie-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = environment.apiUrl;
  private authorizationToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjE2NTVjZTg4NWUwODI1Y2IwOWMxYTY4NGUwNDE4YSIsIm5iZiI6MTcyMjYwNzYxNy4yNDU4ODcsInN1YiI6IjY2YWNlNmY1OTg2OTU0NDE4YjI4YzYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W3HvAYfw6iBonXTuk2bIcvucPzZz2VBb82zvK1Ipv3U';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.authorizationToken,
    });
  }

  getMovieDetails(movieId: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}${movieId}`, {
      headers: this.getHeaders(),
    });
  }

  getReleaseDates(movieId: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      `${this.apiUrl}${movieId}/release_dates`,
      { headers: this.getHeaders() }
    );
  }

  getMovieCredits(movieId: number): Observable<CreditsResponse> {
    return this.http.get<CreditsResponse>(`${this.apiUrl}${movieId}/credits`, {
      headers: this.getHeaders(),
    });
  }

  getMovieTranslations(movieId: number): Observable<MovieTranslationsResponse> {
    return this.http.get<MovieTranslationsResponse>(
      `${this.apiUrl}${movieId}/translations`,
      { headers: this.getHeaders() }
    );
  }

  getMovieVideos(movieId: number): Observable<VideosResponse> {
    return this.http.get<VideosResponse>(`${this.apiUrl}${movieId}/videos`, {
      headers: this.getHeaders(),
    });
  }

  getMovieRecommendations(movieId: number): Observable<RecommendationsResponse> {
    return this.http.get<RecommendationsResponse>(
      `${this.apiUrl}${movieId}/recommendations`,
      { headers: this.getHeaders() }
    );
  }
}
