import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VideoDisplayerComponent } from './video-displayer/video-displayer.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    VideoDisplayerComponent,
    ExamplePdfViewerComponent,
    SearchPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxExtendedPdfViewerModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
