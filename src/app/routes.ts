import { HomeComponent } from "./home/home.component";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./login/login.component";
import {Routes} from '@angular/router';
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CreatePostComponent } from "./create-post/create-post.component";

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
    {
      path: 'user/:id',
      component: UserProfileComponent,
      title: 'User Profile',
    },
    {
      path: 'create-post/:id',
      component: CreatePostComponent,
      title: 'Create Post',
    }
  ];
  export default routeConfig;
