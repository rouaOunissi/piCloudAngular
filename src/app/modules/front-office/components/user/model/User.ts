export class User {
      [key: string]: any; 
      idUser: number;
      firstName: string ;
      lastName: string; 
      email: string;
      password :string;  
      level : number ;
      numTel: number ;
      speciality: string;
      image:string;

      constructor() {
            this.idUser = 0;
            this.firstName = '';
            this.lastName = '';
            this.email = ''; 
            this.password='';
            this.level=0;
            this.numTel=0;
            this.speciality='';
            this.image='';
          }
}