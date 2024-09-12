import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

@NgModule({
 
  imports: [
    BrowserModule,
    FormsModule,
    LandingComponent,
    AppComponent,
    LoginComponent
  ],
  providers: [],
})
export class AppModule { }
