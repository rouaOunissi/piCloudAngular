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
import { ValidationFormsComponent } from './components/sub-components/cours-component/rihem/component/validation-forms/validation-forms.component';
import { ListCourseComponent } from './components/sub-components/cours-component/rihem/component/list-course/list-course.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditComponentComponent } from './components/sub-components/cours-component/rihem/component/edit-component/edit-component.component';
import { UpdateEventComponent } from './components/sub-components/update-event/update-event.component';
import { EditUserComponent } from './components/sub-components/user-component/edit-user/edit-user/edit-user.component';
import { RessourceAddComponent } from './components/sub-components/ressource-add/ressource-add.component';
import { RessourceUpdateComponent } from './components/sub-components/ressource-update/ressource-update.component';
import { StatProjectComponent } from './components/sub-components/project-component/stat-project/stat-project.component';
import { UserStatComponent } from './components/sub-components/user-component/user-stat/user-stat.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {NgbModalModule, NgbRating} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule, OrderPipe } from 'ngx-order-pipe';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter'
import { DownloadComponentComponent } from './components/sub-components/download-component/download-component.component';
import { CalendarLineComponentComponent } from './components/sub-components/calendar-line-component/calendar-line-component.component';
import { AllStatComponent } from './components/sub-components/issue-component/salim/all-stat/all-stat.component';
import { DetailIssueComponent } from './components/sub-components/issue-component/salim/detail-issue/detail-issue.component';
import { ListOfIssueComponent } from './components/sub-components/issue-component/salim/list-of-issue/list-of-issue.component';
import { ListUserComponent } from './components/sub-components/issue-component/salim/list-user/list-user.component';
import { ShowIssueComponent } from './components/sub-components/issue-component/salim/show-issue/show-issue.component';
import { UserDetailsComponent } from './components/sub-components/issue-component/salim/user-details/user-details.component';
import { AddCourseComponent } from './components/sub-components/cours-component/rihem/component/add-course/add-course.component';
import { ChartComponent } from './components/sub-components/cours-component/rihem/component/chart/chart.component';

import { CardPurchaseComponent } from './components/sub-components/purshase/card-purchase/card-purchase.component';

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
    ValidationFormsComponent,
    ListCourseComponent,
    EditComponentComponent,
    UpdateEventComponent,
    EditUserComponent,
    RessourceAddComponent,
    RessourceUpdateComponent,
    StatProjectComponent,
    UserStatComponent,
    DownloadComponentComponent,
    CalendarLineComponentComponent,
    AllStatComponent,
    DetailIssueComponent,
    ListOfIssueComponent,
    ListUserComponent,
    ShowIssueComponent,
    UserDetailsComponent,
    AddCourseComponent,
    ListCourseComponent,
    EditComponentComponent,
    ChartComponent,
    CardPurchaseComponent,
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule,
        NgbModalModule,
        NgxPaginationModule,
        OrderModule,
        Ng2SearchPipeModule,
        NgbRating,


    ]
})
export class AdminModule { }
