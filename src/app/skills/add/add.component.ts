import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Skill } from 'src/app/models/skill';
import { SkillsService } from 'src/app/Service/skills.service';
import { Habilidad, SkillsComponent } from '../skills.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  nombreHabilidad!:string;
  imagenHabilidad!:string;

  habilidadNueva: Habilidad={id:'',nombre:'', imagen:''};
  
  constructor(
    private skillsService: SkillsService,
    private ngxService: NgxUiLoaderService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  agregarHabilidad(){
    const habilidad = new Skill(this.nombreHabilidad, this.imagenHabilidad);

    this.ngxService.start();
    this.skillsService.addHabilidad(habilidad).subscribe(
      data => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Habilidad creada correctamente',
          icon: 'success',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
        this.router.navigate(['/habilidad']);
      },
      err =>{
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al crear la habilidad',
          icon: 'error',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      }
    )
  }

}
