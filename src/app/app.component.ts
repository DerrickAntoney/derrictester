import {Component} from '@angular/core';
import {LandingComponent} from './landing/landing.component';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, RouterModule],
  template: `
    <main>
    <a [routerLink]="['/']">        
      <header class="brand-name">          
        <div>Home</div>
      </header>      </a>
      <section class="content">
       <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}
