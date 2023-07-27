export class Email {
    nombre:string;
    email:string;
    subject:string;
    text:string;

    constructor(nombre:string, email: string, subject:string, text:string){
        this.nombre = nombre;
        this.email = email;
        this.subject = subject;
        this.text = text;
    }
}