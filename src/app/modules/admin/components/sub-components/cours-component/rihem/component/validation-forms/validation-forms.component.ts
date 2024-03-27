import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-validation-forms',
  templateUrl: './validation-forms.component.html',
  styleUrls: ['./validation-forms.component.css']
})
export class ValidationFormsComponent {
  formData: any = {};

  constructor(private http: HttpClient) {}

  addCourse(): void {
    this.http.post('http://localhost:8020/api/v1/cours/create', this.formData).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          // Clear the form after successful submission
          this.formData = {};
        },
        (error) => {
          console.error('Error adding course:', error);
        }
    );
  }
}
