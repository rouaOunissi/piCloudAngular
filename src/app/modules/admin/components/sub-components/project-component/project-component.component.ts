import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../../../service-projet/project-service.service';
import { ResponseProjet } from '../../../service-projet/response-projet.model';
import { ResponseCategory } from '../../../service-projet/response-category.model';


@Component({
  selector: 'app-project-component',
  templateUrl: './project-component.component.html',
  styleUrls: ['./project-component.component.css']
})
export class ProjectComponentComponent implements OnInit {
  Acceptedprojects: ResponseProjet[] = [];
  Pendingprojects: ResponseProjet[] = [];
  Declinedprojects: ResponseProjet[] = [];
  categories: ResponseCategory[] = [];
  categoryName: string = '';
  message: string = '';
  messageDelCat: string = '';

  


  categoryId: number=0 ;
  newCategoryName: string ='';
  messageApCat: string = '';




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
    (data: ResponseCategory[]) => {
      this.categories = data;
    },
    (error) => {
      console.error('Error fetching categories', error);
    }
  );
}

onDeleteCategory(id: number): void {
  
    this.projectService.deleteCategory(id).subscribe({
      next: () => {
        console.log('Category deleted successfully.');
        // Refresh the category list or remove the category from the local state
        this.fetchCategories();
      },
      error: (error) => {
        console.error('Error deleting category', error);
      }
    });
  
}

addCategory() {
  if (!this.categoryName) {
    this.message = 'Please enter a category name.';
    return;
  }

  this.projectService.createCategory(this.categoryName).subscribe({
    next: (response) => {
      // Handle the successful response here
      this.message = 'Category added Successfully';
      this.fetchCategories();
      // ... refresh category list if needed
    },
    error: (error) => {
      // Handle the error response here
      this.message = 'Category already exists !';
      console.error(error);
    }
  });
}

updateCategory() {
  if (!this.categoryId || !this.newCategoryName) {
    this.messageApCat = 'Please enter both Category ID and New Category Name';
    return;
  }
  this.projectService.updateCategory(this.categoryId, this.newCategoryName)
    .subscribe({
      next: (response) => {
        this.messageApCat = 'Category updated successfully';
        this.fetchCategories();
        // Additional logic if needed
      },
      error: (error) => {
        this.messageApCat = 'Verify your category id';
      }
    });
}




}
