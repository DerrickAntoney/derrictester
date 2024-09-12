import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './data.model'; // Import the User interface

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
