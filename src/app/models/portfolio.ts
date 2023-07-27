// export class Portfolio {
//     id!:string;
//     title:string;
//     description:string;



//     constructor(title:string, description:string){
//         this.title = title;
//         this.description = description
//     }
// }

import { FileHandle } from "./file-handle.model";
import { Skill } from "./skill";
import { SkillHandle } from "./skill-handle.model";

export interface Portfolio {
    title: string,
    description: string,
    url: string,
    habilidad: SkillHandle[],
    dataImage: FileHandle[]

}