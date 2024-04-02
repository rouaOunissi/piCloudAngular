import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-validation-forms',
  templateUrl: './validation-forms.component.html',
  styleUrls: ['./validation-forms.component.css']
})
export class ValidationFormsComponent {
  formData: any = {};
  title!:string;
  description!:string;
  uriFile:any;
  price:any;
  myfile:any

  constructor(private http: HttpClient) {}

  /*addCourse(): void {
    this.http.post('http://localhost:8020/api/v1/cours/add', this.formData).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          // Clear the form after successful submission
          this.formData = {};
        },
        (error) => {
          console.error('Error adding course:', error);
        }
    );
  }*/
  selectedfile (event : any){
    this.myfile=event.target.files[0]
  }


  save():void{
    const formData = new FormData();
    formData.append("title",this.title);
    formData.append("description",this.description);
    formData.append("video",this.myfile);
    formData.append("price",this.price);

    console.log("title",this.title);
    console.log("description",this.description);
    console.log("video",this.myfile);
    console.log("price",this.price);

    this.http.post("http://localhost:8020/api/v1/cours/add",formData).subscribe(response=>{
      console.log("saved");

      //  this.openDialog('Issue Created Successfully');

      this.title="";
      this.description="";
      this.myfile=null;
      this.price=null;



    },error=>{
      console.log(error);
      //  this.openDialog('Error while creating issue');

    });
    console.log("saved");
  }
}
