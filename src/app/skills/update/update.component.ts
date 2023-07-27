import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Skill } from 'src/app/models/skill';
import { SkillsService } from 'src/app/Service/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  skill!: Skill;

  constructor(
    private skillService: SkillsService,
    private ngxService: NgxUiLoaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.skillDetails();
  }

  skillDetails(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.ngxService.start();
    this.skillService.detail(id).subscribe(
      data => {
        this.ngxService.stop();
        this.skill = data;
      },
      err => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al cargar los datos de la habilidad',
          icon: 'error',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#297762',

          color: 'var(--text)',
          background: 'var(--background1)',
    
          customClass: {
            confirmButton: 'order-2',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          } 
        })

      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.ngxService.start();
    this.skillService.editHabilidad(id, this.skill).subscribe(
      data => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Modificado con éxito',
          icon: 'success',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#297762',

          color: 'var(--text)',
          background: 'var(--background1)',
    
          customClass: {
            confirmButton: 'order-2',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/habilidad']);
          } 
        })
      },
      err => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al modificar la habilidad',
          icon: 'error',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#297762',

          color: 'var(--text)',
          background: 'var(--background1)',
    
          customClass: {
            confirmButton: 'order-2',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/habilidad']);
          } 
        })
      }
    );
  }

}
