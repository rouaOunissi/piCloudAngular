import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : 'admin' , loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path : 'front' , loadChildren: () => import("./modules/front-office/front-office.module").then(m => m.FrontOfficeModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
