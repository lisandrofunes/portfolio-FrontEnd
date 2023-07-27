import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/Service/auth.service';
import { SkillsService } from 'src/app/Service/skills.service';
import { TokenService } from 'src/app/Service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  admin = false;
  roles!: string[];
  
  lista:any=[]
  constructor(
    private skillsService: SkillsService,
    private ngxService: NgxUiLoaderService,
    private login: AuthService,
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
    console.log(this.roles)
  }

  listarHabilidades(){
    this.ngxService.start();
    this.skillsService.getHabilidades().subscribe(
      res=>{
        this.ngxService.stop();
        this.lista=res
      },
      err=>{
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al listar habilidades',
          icon: 'error',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      }
    )
  }

  borrar(id: number) {
    Swal.fire({
      title: '¿Seguro que desea eliminar la habilidad?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      confirmButtonColor: '#297762',
      denyButtonColor: '#d33',
      color: 'var(--text)',
      background: 'var(--background1)',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxService.start();
        this.skillsService.deleteHabilidad(id).subscribe(
          data => {
            this.ngxService.stop();
            Swal.fire({
              title: 'Eliminado correctamente',
              icon: 'success',
              confirmButtonColor: '#297762',
              color: 'var(--text)',
              background: 'var(--background1)',
            })
            this.listarHabilidades();
          },
          err => {
            this.ngxService.stop();
            Swal.fire({
              title: 'Error al eliminar',
              icon: 'error',
              confirmButtonColor: '#297762',
              color: 'var(--text)',
              background: 'var(--background1)',
            })
          }
        );

      } else if (result.isDenied) {
        Swal.fire({
          title: 'Cambios sin guardar',
          icon: 'info',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        })
      }
    })

  }

}
