import { CommonModule } from '@angular/common';
import { Component, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [ NgCircleProgressModule
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
export class MoviePageComponent {



}
