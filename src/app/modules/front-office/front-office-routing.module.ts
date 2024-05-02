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
import { PaymentIntComponent } from './components/sub-components/pushase/payment-int/payment-int.component';
import { SuccededComponent } from './components/sub-components/pushase/succeded/succeded.component';
import { AccountSellerComponent } from './components/sub-components/pushase/account-seller/account-seller.component';
import { NgxStripeModule } from 'ngx-stripe';


const routes: Routes = [
  {path : "main" , component:HomaPageComponent , children:[
    {path: "event" , component:EventComponent},
    {path: "cours" , component:CoursComponent},
    {path: "project" , component:ProjetComponent},
    {path: "issue" , component:ProblemComponent},
    {path: "ressource" , component:RessourceComponent},
    {path: "finance" , component:PaimentComponent},
      {path: "display-video" , component:DisplayVideoComponent},
    {path:"course-details/:id",component:CoursDetailsComponent , children:[{path:"purchase",component:PaymentIntComponent}]},
    
    {path:'succeeded', component:SuccededComponent},
    {path:'accountTotal',component:AccountSellerComponent},
    


  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},
  




];

@NgModule({
  imports: [RouterModule.forChild(routes),NgxStripeModule.forRoot('pk_test_51OvQL1JeISkzjGkfSTrBn7LnfxK1m6KxfMhOGjovxnXib39jt0IsnCmat0o5O20vImghVfPiWIOgwOm0KfVrV7rZ00seX3K6Jh'),],
  exports: [RouterModule, NgbRatingModule]
})
export class FrontOfficeRoutingModule { }
