export class Requestt {
    id: number ;   
    projetTitle: string; // If the backend sends the project title
    message: string;
    status: string;
  
    constructor(id: number,projectTitle: string, message: string, status: string) {
      this.id=id;
    this.projetTitle = projectTitle;
      this.message = message;
      this.status = status;
    }
  }