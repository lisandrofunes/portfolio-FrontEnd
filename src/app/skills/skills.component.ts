import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../Service/skills.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  admin = false;
  roles!: string[];

  lista:any=[]
  constructor(
    private skillsService: SkillsService,
    private token: TokenService
    ) { }

  ngOnInit(): void {
    this.listarHabilidades();

    this.roles = this.token.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN'){
        this.admin = true;
      }
    })
  }

  listarHabilidades(){
    this.skillsService.getHabilidades().subscribe(
      res=>{this.lista=res},
      err=>console.log(err)
    )
  }

}

export interface Habilidad{
  id:string;
  nombre:string;
  imagen:string;
}

