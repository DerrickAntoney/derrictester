import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { UserWithAlbums } from '../data.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>
      <div *ngIf="!loading && !error">
        <h1>Users and Their Albums</h1>
        <div *ngFor="let user of usersWithAlbums">
          <h2>{{ user.name }}</h2>
          <p>Email: {{ user.email }}</p>
          <h3>Albums:</h3>
          <ul>
            <li *ngFor="let album of user.albums">
              {{ album.title }}
            </li>
          </ul>
        </div>
      </div>

  `,
  styles: ``
})
export class HomeComponent implements OnInit {
  usersWithAlbums: UserWithAlbums[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dataService: DataService) { }

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
}
