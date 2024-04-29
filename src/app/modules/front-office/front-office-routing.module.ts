import { NgModule } from '@angular/core';
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
import {DisplayVideoComponent} from "./components/sub-components/cours/Rihem/display-video/display-video.component";
import { CoursDetailsComponent } from './components/sub-components/cours/Rihem/cours-details/cours-details.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {path : "main" , component:HomaPageComponent , children:[
    {path: "event" , component:EventComponent},
    {path: "cours" , component:CoursComponent},
    {path: "project" , component:ProjetComponent},
    {path: "issue" , component:ProblemComponent},
    {path: "ressource" , component:RessourceComponent},
    {path: "finance" , component:PaimentComponent},
      {path: "display-video" , component:DisplayVideoComponent},
    {path:"course-details/:id",component:CoursDetailsComponent}


  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, NgbRatingModule]
})
export class FrontOfficeRoutingModule { }
