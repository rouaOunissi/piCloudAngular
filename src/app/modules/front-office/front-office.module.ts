import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ProfilComponent } from './components/user/profil/profil.component';
import { EditProfilComponent } from './components/user/edit-profil/edit-profil/edit-profil.component';
import { ShowRequestComponent } from './components/sub-components/projet/showRequest/show-request/show-request.component';
import { RessourceAddComponent } from './components/sub-components/ressource-add/ressource-add.component';
import { RessourceDetailsComponent } from './components/sub-components/ressource-details/ressource-details.component';
import { RessourceUpdateComponent } from './components/sub-components/ressource-update/ressource-update.component';


RessourceDetailsComponent
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
    ProfilComponent,
    EditProfilComponent,
    ShowRequestComponent,
    
    RessourceAddComponent,
    RessourceDetailsComponent,
    RessourceUpdateComponent,
   
    
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule]
})
export class FrontOfficeModule { }
