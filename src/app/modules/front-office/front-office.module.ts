import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomaPageComponent } from './components/homa-page/homa-page.component';
import { EventComponent } from './components/sub-components/event/event.component';
import { ProjetComponent } from './components/sub-components/projet/projet.component';
import { CoursComponent } from './components/sub-components/cours/cours.component';
import { ProblemComponent } from './components/sub-components/problem/problem.component';
import { RessourceComponent } from './components/sub-components/ressource/ressource.component';
import { PaimentComponent } from './components/sub-components/paiment/paiment.component';
import { DisplayVideoComponent } from './components/sub-components/cours/Rihem/display-video/display-video.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursDetailsComponent } from './components/sub-components/cours/Rihem/cours-details/cours-details.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent}, 
  
];

@NgModule({
  declarations: [
    MainLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomaPageComponent,
    EventComponent,
    ProjetComponent,
    CoursComponent,
    ProblemComponent,
    RessourceComponent,
    PaimentComponent,
    DisplayVideoComponent,
    CoursDetailsComponent,
   
    
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule,NgbRatingModule]
})
export class FrontOfficeModule { }
