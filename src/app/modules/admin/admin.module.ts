import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { EventComponentComponent } from './components/sub-components/event-component/event-component.component';
import { IssueComponentComponent } from './components/sub-components/issue-component/issue-component.component';
import { CoursComponentComponent } from './components/sub-components/cours-component/cours-component.component';
import { ProjectComponentComponent } from './components/sub-components/project-component/project-component.component';
import { RessourceComponentComponent } from './components/sub-components/ressource-component/ressource-component.component';
import { UserComponentComponent } from './components/sub-components/user-component/user-component.component';
import { FinanceComponentComponent } from './components/sub-components/finance-component/finance-component.component';
import { FormsModule } from '@angular/forms';
import { UpdateEventComponent } from './components/sub-components/update-event/update-event.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SideBarComponent,
    FooterComponent,
    HeaderComponent,
    EventComponentComponent,
    IssueComponentComponent,
    CoursComponentComponent,
    ProjectComponentComponent,
    RessourceComponentComponent,
    UserComponentComponent,
    FinanceComponentComponent,
    UpdateEventComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
