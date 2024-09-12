import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Photo } from '../data.model';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div class="photos" *ngIf="!loading && !error">
        <h2>{{ album?.title }}</h2>
        <div >
          <div *ngFor="let photo of photos" class="photo-item">
            <img [src]="photo.url" [alt]="photo.title" [loading]="'lazy'" class="photo" />
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
  `,
  styles: ['album.component.css'],
})
export class AlbumComponent implements OnInit {
  albumId: string | null = null;
  album: any;
  photos: Photo[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.albumId = params.get('id');
        if (this.albumId) {
          const album$ = this.http.get(`https://jsonplaceholder.typicode.com/albums/${this.albumId}`);
          const photos$ = this.http.get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${this.albumId}`);
          return forkJoin([album$, photos$]);
        } else {
          return [];
        }
      }),
      catchError(error => {
        this.error = 'Error loading album data';
        this.loading = false;
        return [];
      })
    ).subscribe(([album, photos]) => {
      this.album = album;
      this.photos = photos;
      this.loading = false;
    });
  }
}
