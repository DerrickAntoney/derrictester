import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { UserWithAlbums } from '../data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="!loading && !error">
        <h1>Our users and their albums</h1>
        <div (click)="viewUserProfile(user.id)" class='user'*ngFor="let user of usersWithAlbums">
          <img src="../assets/avatar.jpg" alt="{{ user.name }}'s avatar" class="avatar" width="30px"/>
          <h2 >{{ user.name }}</h2>
          <h3>Number of Albums:</h3>
          <p>{{ user.albums.length }}</p>
        </div>
      </div>

  `,
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  usersWithAlbums: UserWithAlbums[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsersWithAlbums().subscribe(
      data => {
        this.usersWithAlbums = data;
        this.loading = false;
      },
      error => {
        this.error = 'Failed to load data';
        this.loading = false;
      }
    );
  }

  viewUserProfile(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  getAvatarUrl(fileName: string): string {
    return `assets/avatars/${fileName}`;
  }
  
}
