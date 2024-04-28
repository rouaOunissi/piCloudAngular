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
import { AddCourseComponent } from './components/sub-components/cours-component/rihem/component/add-course/add-course.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './components/sub-components/cours-component/rihem/component/chart/chart.component';

const routes: Routes = [
  {path : "main" , component:MainLayoutComponent , children:[
    {path: "event" , component:EventComponentComponent , children: [
      {path: "update/:id" , component: UpdateEventComponent}
    ]},
    {path: "cours" , component:CoursComponentComponent},
    {path: "project" , component:ProjectComponentComponent},
    {path: "user" , component:UserComponentComponent},
    {path: "issue" , component:IssueComponentComponent},
    {path: "ressource" , component:RessourceComponentComponent},
    {path: "finance" , component:FinanceComponentComponent},
    { path: "ListCours" , component:ListCourseComponent},
    {path:"addCours", component:AddCourseComponent},
    {path: "edit/:id" , component:EditComponentComponent},
    {path: "course-chart" , component:ChartComponent}
  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},
  {path: "sidebar", component:SideBarComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule,
  FormsModule, NgbRatingModule ]
})
export class AdminRoutingModule { }




