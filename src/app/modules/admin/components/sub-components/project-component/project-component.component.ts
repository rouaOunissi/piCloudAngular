import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../../service-projet/project-service.service';
import { ResponseProjet } from '../../../service-projet/response-projet.model';

@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css']
})
export class ProjectComponentComponent implements OnInit {
  Acceptedprojects: ResponseProjet[] = [];
  Pendingprojects: ResponseProjet[] = [];
  Declinedprojects: ResponseProjet[] = [];
  categories: string[] = [];




  constructor(private projectService: ProjectServiceService) { }

  ngOnInit() {
    this.loadAcceptedProjects();
    this.loadPendingProjects();
    this.loadDeclinedProjects();
    this.fetchCategories();

}


loadAcceptedProjects() {
  this.projectService.getAllAcceptedProjects().subscribe(
    (data: ResponseProjet[]) => {
      this.Acceptedprojects = data;
    },
    (error) => {
      console.error('Error fetching accepted projects', error);
    }
  );
}
loadDeclinedProjects() {
  this.projectService.getAdminDeclinedProjects().subscribe(
    (data: ResponseProjet[]) => {
      this.Declinedprojects = data;
    },
    (error) => {
      console.error('Error fetching declined projects', error);
    }
  );
}

loadPendingProjects() {
  this.projectService.getAdminPendingProjects().subscribe(
    (data: ResponseProjet[]) => {
      this.Pendingprojects = data;
    },
    (error) => {
      console.error('Error fetching pending projects', error);
    }
  );
}
acceptProject(id: number) {
  this.projectService.adminAcceptProject(id).subscribe({
    next: (response) => {
      // Handle the successful response here, maybe update your UI or give a success message
      console.log('Project accepted', response);
      this.loadAcceptedProjects();
      this.loadPendingProjects();
    },
    error: (error) => {
      // Handle any errors here
      console.error('Error accepting project', error);
    }
  });
}

onDeleteProject(id: number) {
  // Confirmation dialog can be added here
  this.projectService.deleteProject(id).subscribe({
    next: (response) => {
      // Handle the successful response here
      console.log('Project deleted', response);
      this.loadAcceptedProjects();
      this.loadDeclinedProjects();
      this.loadPendingProjects();
    },
    error: (error) => {
      // Handle any errors here
      console.error('Error deleting project', error);
      this.loadAcceptedProjects();
      this.loadDeclinedProjects();
      this.loadPendingProjects();
    }
  });
}

declineProject(id: number) {
  this.projectService.adminDeclineProject(id).subscribe({
    next: (response) => {
      // Handle the successful response here, maybe update your UI or give a success message
      console.log('Project declined', response);
      this.loadDeclinedProjects();
      this.loadPendingProjects();
      
    },
    error: (error) => {
      // Handle any errors here
      console.error('Error accepting project', error);
    }
  });
}
fetchCategories() {
  this.projectService.getAllCategories().subscribe(
    (data: string[]) => {
      this.categories = data;
    },
    (error) => {
      console.error('Error fetching categories', error);
    }
  );
}

}
