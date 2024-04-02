import { Component, OnInit } from '@angular/core';
import { ResponseCategory } from 'src/app/modules/admin/service-projet/response-category.model';
import { ResponseProjet } from 'src/app/modules/admin/service-projet/response-projet.model';
import {ProjectServiceService} from 'src/app/modules/front-office/services/projetService/project-service.service'
import {LocalStorageService} from 'src/app/modules/front-office/services/userService/localStorage/local-storage.service'
import { NewProject } from '../../../services/projetService/NewProject.model';
import { Requestt } from '../../../services/projetService/Request.model';
import { RequestRequest } from '../../../services/projetService/RequestRequest.model';
@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit{

  projects: ResponseProjet[] = [];
  categories: ResponseCategory[] = [];
  newProject: NewProject = new NewProject();
  successMessage: string | null = null;
  shouldShowApplyButton: boolean = true;
  requests: Requestt[] = [];
  showRequestsTable: boolean = false;
  shouldShowDeleteButton: boolean = false;
  shouldShowUpdateButton: boolean = false;
  currentlySelectedProjectId: number = 0 ;
  shouldShowOrojechtRequestButton=false;


  message: string ='';

  isUpdateSectionVisible: boolean = false; // To control the visibility of the update form
  isShowUpdateSectionSectionVisible=false ;
  currentlyEditingProject: ResponseProjet = new ResponseProjet();

  
  requestModel = new RequestRequest();
  isApplySectionVisible = false;

  userId: string | null = null;

  boolreqprojet : boolean = true ;


  constructor(private ProjectServiceService: ProjectServiceService, private  LocalStorageService: LocalStorageService  ) { }

  ngOnInit(): void {
    this.ProjectServiceService.getAllAdminAcceptedProjects().subscribe(
      (data: ResponseProjet[]) => {
        this.projects = data;
        this.shouldShowApplyButton = true;
      },
      error => {
        console.error('There was an error retrieving projects!', error);
      }
    );

    this.ProjectServiceService.getAllCategories().subscribe(
      (data: ResponseCategory[]) => {
        this.categories = data;
        console.log(this.categories[1].name)
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  showApplySection(projectId: number): void {
    this.currentlySelectedProjectId = projectId;
    this.isApplySectionVisible = true;
  }

  hideApplySection(): void {
    this.isApplySectionVisible = false;
  }
  

  
  applyToProject(): void {
    // Assuming you have a method in your service to create a request
    // and 'encadreurId' is obtained from somewhere in your component
    const encadreurId = Number(localStorage.getItem("userId")); // Replace with actual logic to retrieve the encadreur ID
    

    const requestRequest = {
      encadreurId: encadreurId,
      projectId: this.currentlySelectedProjectId,
      message: this.message // this.message should be bound to your input field in the HTML
    };


    this.ProjectServiceService.createRequest(requestRequest).subscribe({
      next: (response) => {
        // Handle the success scenario
        console.log('Request created successfully', response);
        this.successMessage = 'Applied to project successfully!';
        this.hideApplySection();

        
        // Additional logic to handle after applying
      },
      error: (error) => {
        // Handle the error scenario
        console.error('Error creating the request', error);
        this.hideApplySection();

      }
    });
  }
  deleteRequest(requestId: number): void {
      this.ProjectServiceService.deleteRequest(requestId).subscribe({
        next: () => {
          console.log('Request deleted successfully');
          // Update the list of requests to reflect the change
          this.loadMyRequests();
        },
        error: error => {
          console.error('There was an error!', error);
          this.loadMyRequests();
        }
      });
    
  }

  showUpdateSection(project: ResponseProjet): void {
    this.currentlyEditingProject = { ...project }; // Clone the project to edit
    this.isUpdateSectionVisible = true;
  }




  projectRequests: Requestt[] = [];
  projectTitle:string='';
  showProjectRequestSection(project: ResponseProjet): void {
    
    this.isShowUpdateSectionSectionVisible = true;
    this.projectTitle=project.title;
    this.fetchProjectRequests(project.id);


  }
  fetchProjectRequests(projectId: number): void {
    // Assuming you have a service that fetches requests based on the project ID
    this.ProjectServiceService.getRequestByProjectId(projectId).subscribe({
      next: (requests) => {
        this.projectRequests = requests;
      },
      error: (err) => {
        console.error('Failed to fetch project requests', err);
      }
    });
  }

  acceptRequest(reqId: number): void {
    this.ProjectServiceService.acceptRequest(reqId).subscribe({
      next: (response) => {
        console.log('Request accepted successfully', response);
        // Handle the response, e.g., refresh the list of requests or show a success message
      },
      error: (error) => {
        console.error('Error accepting request:', error);
      }
    });
  }
  
  declineRequest(reqId: number): void {
    this.ProjectServiceService.declineRequest(reqId).subscribe({
      next: (response) => {
        console.log('Request declined successfully', response);
        // Handle the response, e.g., refresh the list of requests or show a success message
      },
      error: (error) => {
        console.error('Error declining request:', error);
      }
    });

  


  }
  

  hideUpdateSection(): void {
    this.isUpdateSectionVisible = false;
  }

  updateProject(): void {
    if (!this.currentlyEditingProject) {
      console.error('No project selected to update');
      return;
    }

    // Construct the request body
    const requestBody = {
      title: this.currentlyEditingProject.title,
      description: this.currentlyEditingProject.description
    };

    this.ProjectServiceService.updateProject(this.currentlyEditingProject.id, requestBody).subscribe({
      next: (response) => {
        // Handle successful update
        console.log('Project updated successfully');
        this.successMessage = 'Project updated successfully!';
        this.hideUpdateSection();
        this.loadMyProjects();
        // Refresh the project list or handle UI updates as necessary
      },
      error: (error) => {
        console.error('Error updating project:', error);
      }
    });
  }

  loadProjectsByCategory(categoryId: number): void {
    
    this.ProjectServiceService.getProjectsByCategory(categoryId).subscribe(
      (data: ResponseProjet[]) => {
        this.shouldShowApplyButton = true;
        this.projects = data; // This will update the list of projects displayed
        console.log(`Loading projects for category ${categoryId}`);
        this.boolreqprojet = true ;
        this.shouldShowApplyButton = true;
        this.boolreqprojet = true ;
        this.shouldShowDeleteButton = false;
        this.shouldShowUpdateButton = false;
        this.hideUpdateSection();
        this.hideApplySection();




      },
      error => {
        console.error('There was an error retrieving projects by category!', error);
      }
    );
  }

  loadAllProjects(): void {
    this.ProjectServiceService.getAllAdminAcceptedProjects().subscribe(
      (data: ResponseProjet[]) => {
        this.projects = data;
        this.shouldShowApplyButton = true;
        this.boolreqprojet = true ;
        this.shouldShowDeleteButton = false;
        this.shouldShowUpdateButton = false;
        this.hideUpdateSection();
        this.hideApplySection();




      },
      error => {
        console.error('There was an error retrieving all projects!', error);
      }
    );
  }


  createProject(): void {
    if (!this.newProject.title || !this.newProject.description || !this.newProject.categoryId) {
      console.error('All fields are required');
      return;
    }
   
    this.newProject.creatorId = Number(localStorage.getItem("userId")); // Convert to number if necessary
  
    this.ProjectServiceService.createProject(this.newProject).subscribe(
      (response) => {
        console.log('Project created successfully', response);
        this.successMessage = 'Project created successfully!';
        this.clearSuccessMessageAfterDelay();
        this.loadMyProjects();
        // Optionally clear the form or give feedback to the user
        this.newProject = new NewProject(); // Clear the form
      },
      (error) => {
        console.error('There was an error creating the project', error);
      }
    );
  }

  private clearSuccessMessageAfterDelay(delayMs: number = 3000): void {
    setTimeout(() => {
      this.successMessage = null;
    }, delayMs);
  }

  loadMyProjects(): void {
    const userId = localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null;
    if (!userId) {
      console.error('User ID is required to load projects');
      return;
    }

    this.ProjectServiceService.getUserProjects(Number(userId)).subscribe(
      (projects) => {
        this.projects = projects; // This assumes that your API returns an array of ResponseProjet
        console.log('My projects loaded successfully', projects);
        this.shouldShowApplyButton = false;
        this.shouldShowDeleteButton = true;
        this.shouldShowUpdateButton = true;
        this.hideUpdateSection();
        this.hideApplySection();


        this.boolreqprojet = true ;



      },
      (error) => {
        console.error('Error loading my projects', error);
      }
    );
  }


  loadMyRequests(): void {
    const userId = localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null;
    if (userId) {
      this.ProjectServiceService.getRequestsByEncadreurId(Number(userId)).subscribe(
        (response) => {
          this.requests = response.map(req => new Requestt(req.id,req.projetTitle,req.message,req.status));
          this.boolreqprojet = false ;
          this.hideUpdateSection();
          this.hideApplySection();


        },
        (error) => {
          console.error('Error fetching requests:', error);
        }
      );
    } else {
      console.error('User ID is not available in local storage.');
    }
  }

  deleteProject(id: number): void {
    
      this.ProjectServiceService.deleteProject(id).subscribe(
        response => {
          console.log(response);
          this.loadMyProjects();
          // Update your frontend to reflect the project's deletion
          // This can be removing the project from a list in the UI
          this.projects = this.projects.filter(project => project.id !== id);
        },
        error => {
          console.error("Error deleting project", error);
        }
      );
    

  }
  
  }
