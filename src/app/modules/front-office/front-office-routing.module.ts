import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponent } from './components/sub-components/event/event.component';
import { CoursComponent } from './components/sub-components/cours/cours.component';
import { ProjetComponent } from './components/sub-components/projet/projet.component';
import { ProblemComponent } from './components/sub-components/problem/problem.component';
import { RessourceComponent } from './components/sub-components/ressource/ressource.component';
import { PaimentComponent } from './components/sub-components/paiment/paiment.component';
import { HomaPageComponent } from './components/homa-page/homa-page.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfilComponent } from './components/user/profil/profil.component';
import { EditProfilComponent } from './components/user/edit-profil/edit-profil/edit-profil.component';
import { IssueComponentComponent } from '../admin/components/sub-components/issue-component/issue-component.component';
import { DetailsIssueComponent } from './components/sub-components/problem/salim/details-issue/details-issue.component';
import { CreateIssueComponent } from './components/sub-components/problem/salim/create-issue/create-issue.component';
import { UpdateIssueComponent } from './components/sub-components/problem/salim/update-issue/update-issue.component';
import { DisplayAllCommentComponent } from './components/sub-components/problem/salim/display-all-comment/display-all-comment.component';
import { ChatBotComponent } from './components/sub-components/problem/salim/chat-bot/chat-bot.component';

const routes: Routes = [
  {path : "main" , component:HomaPageComponent , children:[
    {path: "event" , component:EventComponent},
    {path: "cours" , component:CoursComponent},
    {path: "project" , component:ProjetComponent},
    {path: "issue" , component:ChatBotComponent },
    {path: "issue/goToissue" , component:ProblemComponent },
    {path: "issue/goToissue/display" ,component:DetailsIssueComponent},
    {path: "issue/goToissue/update-issue/:id_issue" ,component:UpdateIssueComponent},
    {path: "issue/goToissue/displayAllComment/:id_issue" ,component:DisplayAllCommentComponent},
    {path: "issue/goToissue/goToChat" ,component:ChatBotComponent},
    {path: "ressource" , component:RessourceComponent},
    {path: "finance" , component:PaimentComponent},
    {path:"profil",component:ProfilComponent,children:[
      {path:"editProfil/:id",component:EditProfilComponent},
   
    ]},
   
  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},
  {path:"login" , component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
