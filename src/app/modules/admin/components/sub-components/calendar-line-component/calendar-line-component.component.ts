import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Observable } from 'rxjs';
import { TimelineEvent } from 'ngx-timeline';

import { map } from 'rxjs/operators';
import { NgxTimelineModule } from 'ngx-timeline';

interface CustomTimelineEvent {
  date: string; 
  title: string; 
}

@Component({
  selector: 'app-calendar-line-component',
  templateUrl: './calendar-line-component.component.html',
  styleUrls: ['./calendar-line-component.component.css']
})
export class CalendarLineComponentComponent implements OnInit{
  events: TimelineEvent[] = [];

  calendarLines: any[] = []; 
  selectedFileAdd: File | null = null;
  selectedFileUp: File | null = null;
  
  specialites: any[] = [];
  fileName: string = 'Choose file'; 
  addFileName: string = 'Choose file'; 
  updateFileName: string = 'Choose file'; 
  title: string='';
  previousSpec: string = '';
  ress: any = {}; 

  newCalendarLine: any = {};
  updatedCalendarLine: any = {};
  constructor(
    private http: HttpClient,
    private router: Router,
    private activated : ActivatedRoute) {}

  calendarLine = {

    idUser: '',
    urlFile:'',
    fileName:'',
    fileType:'',
    anneeUniv:'',
    specialite:'',
    dateCreation: new Date(),
 
  };



  ngOnInit(): void {

    this.loadCalendar(); 
    this.getCalById();
    this.getSpcialites();
    this.extractContent();

 

  }


  
  loadCalendar(): void {
    this.http.get<any[]>('http://localhost:8060/api/v1/calendarLine/getCalendarLine').subscribe(data => {
     this.calendarLines = data;
 }, error => {
     console.log(error);
 });
 }

 calendarEvents: Observable<TimelineEvent[]> | null = null;




extractContent() {
  const idCalendarLine = 1; // Remplacez par l'ID de la ligne de calendrier souhaitée
  this.http.get<any>(`/extractContentCalendar/${idCalendarLine}`).subscribe(
    (response) => {
      // Traitement du contenu de la réponse
      this.events = this.identifyEvents(response); // Supposant que identifyEvents est une fonction qui analyse le contenu et retourne les événements
    },
    (error) => {
      console.error('Erreur lors de la récupération du contenu du calendrier :', error);
    }
  );
}

identifyEvents(content: string): any[] {
  const events: any[] = [];
  
  // Expression régulière pour rechercher les dates au format "1 Janvier"
  const dateRegex = /(\d{1,2}\s+[A-Z][a-z]+)/g;
  
  // Recherche de toutes les occurrences de dates dans le contenu
  const dates = content.match(dateRegex);

  if (dates) {
    // Pour chaque date trouvée, recherchez le titre de l'événement qui suit
    dates.forEach(date => {
      const index = content.indexOf(date);
      const eventTitle = content.substring(index + date.length).split('\n')[0].trim();
      events.push({ date: date, title: eventTitle });
    });
  }
  
  return events;
}


 addCalendar(): void {
  const formData = new FormData();
  if (this.selectedFileAdd) {
    formData.append('file', this.selectedFileAdd);
  }
  formData.append('calendarLine', JSON.stringify(this.ress));

  this.http.post('http://localhost:8060/api/v1/calendarLine/uploadCalendarLineData', formData)
    .subscribe(
      (response: any) => { 
        console.log('calendar added successfully:', response);
      
        this.ress = {};
        this.fileName = ''; 
      
        this.router.navigate(['/admin/main/calendarLine']);
      },
      (error: any) => { 
        console.error('Error adding calendar:', error);
        
      }
    );
}

 deleteCalendar(idCalendarLine: number): void {
  console.log(idCalendarLine);
  this.http.delete<any>('http://localhost:8060/api/v1/calendarLine/deleteCalendarLine/' + idCalendarLine).subscribe(
    (res) => {
      console.log('Calendar deleted successfully!');
      this.loadCalendar();
      console.log(res);
    },
    (error) => {
      console.log(error);
    }
  );
}



getCalendarById(id: number): Observable<any> { 
  return this.http.get(`http://localhost:8060/api/v1/calendarLine/getCalendarLineByid/` + id);
}



idCalendarLine:number = this.activated.snapshot.params["id"];

 getCalById(): void {
  this.getCalendarById(this.idCalendarLine).subscribe((response)=>
  {
   this.calendarLine=response;
   this.previousSpec = response.specialite;
   console.log(response);
  })
 }

 editCalendar(calendarLine: any): void {
  this.calendarLine = { ...calendarLine }; // Copie les propriétés de la ligne de calendrier à mettre à jour
}




updatedCal(): void {
  if (this.selectedFileUp) {
    // Mettre à jour le nom du fichier dans calendarLine
    this.calendarLine.urlFile = this.selectedFileUp.name;
    // Créer un nouveau FormData pour inclure le fichier
    const formData = new FormData();
    formData.append('file', this.selectedFileUp);
    formData.append('calendarLine', JSON.stringify(this.calendarLine));
    // Envoyer la mise à jour avec le fichier
    this.http.put('http://localhost:8060/api/v1/calendarLine/update/' + this.idCalendarLine, formData)
      .subscribe(
        (res: any) => {
          console.log(res);
          alert("Calendar updated successfully!");
          this.router.navigate(['/admin/main/calendarLine']);
        },
        (error: any) => {
          console.log(error);
          alert("An error occurred while updating the calendar!");
        }
      );
  } else {
    // Si aucun fichier n'est sélectionné, mettre à jour seulement les autres champs
    this.http.put('http://localhost:8060/api/v1/calendarLine/update/' + this.idCalendarLine, this.calendarLine)
      .subscribe(
        (res: any) => {
          console.log(res);
          alert("Calendar updated successfully!");
          this.router.navigate(['/admin/main/calendarLine']);
        },
        (error: any) => {
          console.log(error);
          alert("An error occurred while updating the calendar!");
        }
      );
  }
}


onFileSelected(event: any): void {
  this.selectedFileAdd = event.target.files[0];
  this.addFileName = this.selectedFileAdd ? this.selectedFileAdd.name : 'Choose file';
  const inputElement = document.getElementById('exampleInputFile');
  if (inputElement && inputElement.nextElementSibling) {
      inputElement.nextElementSibling.innerHTML = this.addFileName;
  }
}

onFileSelectedUp(event: any): void {
  this.selectedFileUp = event.target.files[0];
  this.updateFileName = this.selectedFileUp ? this.selectedFileUp.name : 'Choose file';
  const inputElement = document.getElementById('exampleFileUp');
  if (inputElement && inputElement.nextElementSibling) {
      inputElement.nextElementSibling.innerHTML = this.updateFileName;
  }
}

getAllSpcialites(): Observable<any[]> {
    
  return this.http.get<any[]>('http://localhost:8060/api/v1/calendarLine/listeSpecialites');
}

getSpcialites(): void {
  this.getAllSpcialites().subscribe(
      (types: any[]) => {
          this.specialites = types; 
      },
      (error: any) => {
          console.log(error);
      }
  );
}

}
