import { NgModule } from '@angular/core';
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
import { DetailsIssueComponent } from './components/sub-components/problem/salim/details-issue/details-issue.component';
import { CommentComponent } from './components/sub-components/problem/salim/comment/comment.component';
import { AddCommentComponent } from './components/sub-components/problem/salim/add-comment/add-comment.component';
import { CreateIssueComponent } from './components/sub-components/problem/salim/create-issue/create-issue.component';
import { VariableComponent } from './components/sub-components/problem/salim/variable/variable.component';
import { UpdateIssueComponent } from './components/sub-components/problem/salim/update-issue/update-issue.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

import { DisplayAllCommentComponent } from './components/sub-components/problem/salim/display-all-comment/display-all-comment.component';
import { ChatBotComponent } from './components/sub-components/problem/salim/chat-bot/chat-bot.component';
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
    DetailsIssueComponent,
    CommentComponent,
    AddCommentComponent,
    CreateIssueComponent,
    VariableComponent,
    UpdateIssueComponent,
    DisplayAllCommentComponent,
    ChatBotComponent,
   
    
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule, 
    MatSnackBarModule ,
    Ng2SearchPipeModule
  ],
  exports: [RouterModule]
})
export class FrontOfficeModule { }
