import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Persona } from '../models/persona';
import { ImageProcessingService } from '../Service/image-processing.service';
import { PersonaService } from '../Service/persona.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  admin = false;
  roles!: string[];

  persona: any[] = []

  constructor(
    private personaService: PersonaService,
    private imageProcessingService: ImageProcessingService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.roles = this.token.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.admin = true;
      }
    })

    this.listarPersona();
  }

  listarPersona(){
    this.personaService.getPersona()
    .pipe(
      map((x:Persona[], i) => x.map((persona:Persona) => this.imageProcessingService.createImages(persona)))
    )
    .subscribe(
      (data: Persona[]) => {
        this.persona = data;
      },
      (err) => {
        console.log("error")
      }
    )
  }

}
