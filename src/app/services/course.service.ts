import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../modules/models/course.model';

const baseUrl = 'http://localhost:8020/api/v1/cours/';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(baseUrl);
  }

  createCourse(course: string, files: File[]) {

    const formData = new FormData();
    formData.append('course', course);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post(baseUrl, formData);
  }
  updateCouse(id: number, course: Course){
    return this.http.put<Course>(baseUrl+id, course);
  }
  deleteCourse(id : number): Observable<void>{
    return this.http.delete<void>(baseUrl+id);
  }
  getCoursebyId(id : number): Observable<Course>{
    return this.http.get<Course>(baseUrl+id);
  }
  findByTitle(title:any): Observable<Course[]>{
    return this.http.get<Course[]>(`${baseUrl}title/${title}`);
  }
}
