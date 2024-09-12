import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  template: `
  <div class="landing">
    <h1>Welcome to Our App</h1>
    <button (click)="goToLogin()">Login</button>
   </div>

  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
