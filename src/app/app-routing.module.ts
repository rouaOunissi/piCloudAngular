import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoDisplayerComponent } from './video-displayer/video-displayer.component';

const routes: Routes = [
  { path: '', redirectTo: '/front/main', pathMatch: 'full' },
  {path : 'admin' , loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path : 'front' , loadChildren: () => import("./modules/front-office/front-office.module").then(m => m.FrontOfficeModule)},
  { path: 'video', component: VideoDisplayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
