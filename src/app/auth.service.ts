import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://dummyjson.com/auth/login'; // Replace with actual endpoint if available

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      this.http.post<any>(this.authUrl, { username, password }).subscribe(
        response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token); // Store token for session management
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}
