import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponentComponent } from './template-component/template-component.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FrontOfficeTemplateComponent } from './front-office-template/front-office-template.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponentComponent,
    LeftSideBarComponent,
    HeaderComponent,
    FooterComponent,
    FrontOfficeTemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
