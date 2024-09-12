import { HomeComponent } from "./home/home.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import {Routes} from '@angular/router';

const routeConfig: Routes = [
    {
      path: '',
      component: LandingComponent,
      title: 'Landing',
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login',
    },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home',
    },
  ];
  export default routeConfig;
