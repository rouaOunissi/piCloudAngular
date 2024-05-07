import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EventComponentComponent } from './components/sub-components/event-component/event-component.component';
import { CoursComponentComponent } from './components/sub-components/cours-component/cours-component.component';
import { ProjectComponentComponent } from './components/sub-components/project-component/project-component.component';
import { UserComponentComponent } from './components/sub-components/user-component/user-component.component';
import { IssueComponentComponent } from './components/sub-components/issue-component/issue-component.component';
import { RessourceComponentComponent } from './components/sub-components/ressource-component/ressource-component.component';
import { FinanceComponentComponent } from './components/sub-components/finance-component/finance-component.component';
import {
  ListCourseComponent
} from "./components/sub-components/cours-component/rihem/component/list-course/list-course.component";
import {
  EditComponentComponent
} from "./components/sub-components/cours-component/rihem/component/edit-component/edit-component.component";
import { FormsModule } from '@angular/forms';
import { UpdateEventComponent } from './components/sub-components/update-event/update-event.component';
import { EditUserComponent } from './components/sub-components/user-component/edit-user/edit-user/edit-user.component';
import { RessourceAddComponent } from './components/sub-components/ressource-add/ressource-add.component';
import { RessourceUpdateComponent } from './components/sub-components/ressource-update/ressource-update.component';
import { StatProjectComponent } from './components/sub-components/project-component/stat-project/stat-project.component';
import { UserStatComponent } from './components/sub-components/user-component/user-stat/user-stat.component';
import { DownloadComponentComponent } from './components/sub-components/download-component/download-component.component';
import { CalendarLineComponentComponent } from './components/sub-components/calendar-line-component/calendar-line-component.component';
import { ShowIssueComponent } from './components/sub-components/issue-component/salim/show-issue/show-issue.component';
import { AllStatComponent } from './components/sub-components/issue-component/salim/all-stat/all-stat.component';
import { AddCourseComponent } from './components/sub-components/cours-component/rihem/component/add-course/add-course.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './components/sub-components/cours-component/rihem/component/chart/chart.component';
import { CardPurchaseComponent } from './components/sub-components/purshase/card-purchase/card-purchase.component';
const routes: Routes = [
  {path : "main" , component:MainLayoutComponent , children:[
    {path: "event" , component:EventComponentComponent , children: [
      {path: "update/:id" , component: UpdateEventComponent},
    ]},
    {path: "cours" , component:CoursComponentComponent},
    {path: "project" , component:ProjectComponentComponent},
    {path: "user" , component:UserComponentComponent , children:[
      {path:"editUser/:idUser", component:EditUserComponent} , {path:"userStat",component:UserStatComponent}
    ]},

    { path: "ressource", component: RessourceComponentComponent },
    { path: "addRess", component: RessourceAddComponent },
    { path: "updateRess/:id", component: RessourceUpdateComponent },
    { path: 'calendarLine/:id', component: CalendarLineComponentComponent },
    { path: "download", component: DownloadComponentComponent },
    { path: "calendarLine", component: CalendarLineComponentComponent },
    {path: "finance" , component:FinanceComponentComponent},
      { path: "ListCours" , component:ListCourseComponent},
      {path: "edit/:id" , component:EditComponentComponent},
      {path:"projectStat", component:StatProjectComponent},
      {path: "issue" , component:IssueComponentComponent},
    {path: "issue/show-issue/:id_issue" ,component:ShowIssueComponent},
    {path: "issue/goToStat" ,component:AllStatComponent},

  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},
  {path: "sidebar", component:SideBarComponent},
  { path: "ListCours" , component:ListCourseComponent},
  {path:"addCours", component:AddCourseComponent},
  {path: "edit/:id" , component:EditComponentComponent},
  {path: "course-chart" , component:ChartComponent},
  {path:"adminPurchase",component:CardPurchaseComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule,NgbRatingModule],
  exports: [RouterModule,
  FormsModule, ]
})
export class AdminRoutingModule { }




