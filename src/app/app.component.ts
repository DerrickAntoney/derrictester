import {Component, OnInit} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {RouterModule,Router,NavigationEnd} from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, RouterModule, CommonModule],
  template: `
    <main>
    <a [routerLink]="['/']">        
      <header class="brand-name" *ngIf="showHeader">          
        <div>Logout</div>
      </header>      </a>
      <section class="content">
       <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Hide header on landing page
      this.showHeader = this.router.url !== '/';
      this.showHeader = this.router.url !== '/login';
    });
  }
}
