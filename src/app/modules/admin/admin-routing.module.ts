import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EventComponentComponent } from './components/sub-components/event-component/event-component.component';

const routes: Routes = [
  {path : "main" , component:MainLayoutComponent , children:[
    {path: "event" , component:EventComponentComponent}
  ]},
  {path : "footer" , component:FooterComponent},
  {path: "header" , component:HeaderComponent},
  {path: "sidebar", component:SideBarComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }




