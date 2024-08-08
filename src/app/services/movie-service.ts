import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MovieResponse } from "../typings/movie-response";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/';

  constructor(private http: HttpClient) {}

  getMovieDetails(movieId: number): Observable<MovieResponse> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjE2NTVjZTg4NWUwODI1Y2IwOWMxYTY4NGUwNDE4YSIsIm5iZiI6MTcyMjYwNzYxNy4yNDU4ODcsInN1YiI6IjY2YWNlNmY1OTg2OTU0NDE4YjI4YzYyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W3HvAYfw6iBonXTuk2bIcvucPzZz2VBb82zvK1Ipv3U',
    });

    return this.http.get<MovieResponse>(`${this.apiUrl}${movieId}`, { headers });
  }
}
