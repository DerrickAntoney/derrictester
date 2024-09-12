import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Post, Album } from '../data.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="!loading && !error" class="profile-container">
        <h2 class="user-name">{{ user?.name }}</h2>
        <p class="user-website">Website: <a [href]="user?.website" target="_blank">{{ user?.website }}</a></p>
        <button class="create-post-button" (click)="createPost()">Create New Post</button>
        <h3>Albums</h3>
        <ul class="album-list">
          <li *ngFor="let album of albums" class="album-item" (click)="viewAlbum(album.id)">
            {{ album.title }}
          </li>
        </ul>
        <h3>Posts</h3>
        <ul class="post-list">
          <li *ngFor="let post of posts" class="post-item">
            <h4 class="post-title">{{ post.title }}</h4>
            <p class="post-body">{{ post.body }}</p>
          </li>
        </ul>
      </div>

  `,
  styleUrls: ['user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string | null = null;
  user: any; // You might want to create a User type or interface
  posts: Post[] = [];
  albums: Album[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.userId = params.get('id');
        if (this.userId) {
          const user$ = this.http.get(`https://jsonplaceholder.typicode.com/users/${this.userId}`);
          const posts$ = this.http.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${this.userId}`);
          const albums$ = this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/albums?userId=${this.userId}`);
          return forkJoin([user$, posts$, albums$]);
        } else {
          return [];
        }
      }),
      catchError(error => {
        this.error = 'Error loading user data';
        this.loading = false;
        return [];
      })
    ).subscribe(([user, posts, albums]) => {
      this.user = user;
      this.posts = posts;
      this.albums = albums;
      this.loading = false;
    });
  }

  createPost(): void {
    if (this.userId) {
      this.router.navigate([`/create-post/${this.userId}`]);
    }
  }

  viewAlbum(albumId: number): void {
    this.router.navigate([`/album/${albumId}`]);
  }
}
