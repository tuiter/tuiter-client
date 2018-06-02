import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ReviewStationComponent } from './reviewstation/reviewstation.component';

// User related components
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkstationComponent } from './workstation/workstation.component';

// Authorization related components
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UpdatePassComponent } from './auth/update-pass/update-pass.component';

// Essay related components
import { EssayComponent } from './essay/essay.component';
import { ReviewEssay } from './essay/review-essay/review-essay.component';
import {CreateEssayComponent} from './essay/create-essay/create-essay.component';
import { EssayCardComponent } from './essay/essay-card/essay-card.component';
import { EditEssayComponent } from './essay/edit-essay/edit-essay.component';
import { DeleteEssayComponent } from './essay/delete-essay/delete-essay.component';


// Services
import { UserService } from './services/user.service';
import { AuthGuardService } from './auth-guard.service';
import { EssayService } from './services/essay.service';
import { ReviewService } from './services/review.service';
import { AuthenticationService } from './services/authentication.service';

// Loading environment
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HeaderComponent,
    ReviewEssay,
    HomeComponent,
    LoginComponent,
    DropdownDirective,
    ProfileComponent,
    EditProfileComponent,
    UpdatePassComponent,
    ReviewStationComponent,
    NavbarComponent,
    WorkstationComponent,
    EssayComponent,
    CreateEssayComponent,
    EditEssayComponent,
    EssayCardComponent,
    DeleteEssayComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {provide: 'API', useValue: environment.apiUrl},
    AuthenticationService,
    AuthGuardService,
    UserService,
    EssayService,
    ReviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
