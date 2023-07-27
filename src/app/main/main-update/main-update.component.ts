import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandle } from 'src/app/models/file-handle.model';
import { Persona } from 'src/app/models/persona';
import { ImageProcessingService } from 'src/app/Service/image-processing.service';
import { PersonaService } from 'src/app/Service/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-update',
  templateUrl: './main-update.component.html',
  styleUrls: ['./main-update.component.css']
})
export class MainUpdateComponent implements OnInit {

  persona: Persona = {
    saludo: "",
    nombre: "",
    dedicacion: "",
    dataImage: []
  }
  
  constructor(
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private imageProcessingService: ImageProcessingService,
    private ngxService: NgxUiLoaderService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPersona();
  }

  getPersona(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.ngxService.start();
    this.personaService.detail(id).subscribe(
      (data) => {
        this.ngxService.stop();
        this.persona = this.imageProcessingService.createImages(data);
      },
      (err) => {
        console.log("error");
      }
    )
  }

  onFileSelected(event: any) {

    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.persona.dataImage.push(fileHandle);
    }
  }
  
  removeImages(i:number){
    this.persona.dataImage.splice(i,1)
  }

  prepareForData(persona: Persona): FormData {
    const formData = new FormData();

    formData.append(
      'persona',
      new Blob([JSON.stringify(persona)], { type: 'application/json' })
    );
  
    for (var i = 0; i < persona.dataImage.length; i++) {
      formData.append(
        'imageFile',
        persona.dataImage[i].file,
        persona.dataImage[i].file.name
      );
    }

    return formData;
  }

  onUpdate(): void { 
    const personaFormData = this.prepareForData(this.persona);

    const id = this.activatedRoute.snapshot.params['id'];

    this.ngxService.start();
    this.personaService.editPersona(id, personaFormData).subscribe(
      data => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Persona modificada correctamente',
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
            this.router.navigate(['/']);
          } 
        })
      },
      err => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al modificar la persona',
          icon: 'error',
          confirmButtonColor: '#297762',

          color: 'var(--text)',
          background: 'var(--background1)',

        });
      }
    );
  
  }

}
