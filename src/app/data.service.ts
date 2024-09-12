import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Album, UserWithAlbums } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  private albumsUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl);
  }

  getUsersWithAlbums(): Observable<UserWithAlbums[]> {
    return forkJoin([this.getUsers(), this.getAlbums()]).pipe(
      map(([users, albums]) => {
        return users.map(user => ({
          ...user,
          albums: albums.filter(album => album.userId === user.id)
        }));
      })
    );
  }
}
