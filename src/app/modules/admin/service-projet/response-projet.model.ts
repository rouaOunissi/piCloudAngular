export class ResponseProjet {
    id: number;
    title: string;
    description: string;
    creationDate: Date;
    status: string;
    image?: string; // Assuming status is a string; adjust as needed

    constructor(
      id: number = 0,
      title: string = '',
      description: string = '',
      creationDate: Date = new Date(),
      status: string = 'pending' // Assuming a default status of 'pending'
  ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.creationDate = creationDate;
      this.status = status;
  }
    
  }