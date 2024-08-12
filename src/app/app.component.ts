import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoviePageComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'MovieDetails';
}
