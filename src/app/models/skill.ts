export class Skill {
    id!:string;
    nombre:string;
    imagen:string;

    constructor(nombre: string, imagen:string){
        this.nombre = nombre;
        this.imagen = imagen;
    }
}
