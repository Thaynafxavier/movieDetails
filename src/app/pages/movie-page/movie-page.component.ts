import { CommonModule } from '@angular/common';
import { Component, ElementRef, ModuleWithProviders, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
export class MoviePageComponent  {

  images: string[] = [
    'path/to/image1.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg'
    // Adicione mais caminhos de imagens conforme necessário
  ];

}
