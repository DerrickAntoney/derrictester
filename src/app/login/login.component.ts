import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login">
      <h2>Login</h2>
      <form (ngSubmit)="login()">
        <label for="username">Username:</label>
        <input type="text" id="username" [(ngModel)]="username" name="username" required>

        <label for="password">Password:</label>
        <input type="password" id="password" [(ngModel)]="password" name="password" required>

        <button type="submit">Login</button>
      </form>
      <p *ngIf="errorMessage">{{ errorMessage }}</p>
    </div>
  `,
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.authenticate(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      error => {
        this.errorMessage = 'An error occurred';
      }
    );
  }

}
