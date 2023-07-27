import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandle } from 'src/app/models/file-handle.model';
import { SobreMi } from 'src/app/models/sobreMi';
import { ImageProcessingService } from 'src/app/Service/image-processing.service';
import { SobreMiService } from 'src/app/Service/sobre-mi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-update',
  templateUrl: './about-update.component.html',
  styleUrls: ['./about-update.component.css']
})
export class AboutUpdateComponent implements OnInit {

  sobreMi: SobreMi = {
    texto: "",
    dataImage: []
  }
  constructor(
    private sobreMiService: SobreMiService,
    private activatedRoute: ActivatedRoute,
    private imageProcessingService: ImageProcessingService,
    private ngxService: NgxUiLoaderService,
    private sanitizer: DomSanitizer,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getSobreMi();
  }

  getSobreMi() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.ngxService.start();
    this.sobreMiService.detail(id).subscribe(
      (data) => {
        this.ngxService.stop(),
        this.sobreMi = this.imageProcessingService.createImages(data);
      },
      (err) => {
        this.ngxService.stop(),
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
      this.sobreMi.dataImage.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.sobreMi.dataImage.splice(i, 1)
  }

  prepareForData(sobreMi: SobreMi): FormData {
    const formData = new FormData();

    formData.append(
      'sobreMi',
      new Blob([JSON.stringify(sobreMi)], { type: 'application/json' })
    );

    for (var i = 0; i < sobreMi.dataImage.length; i++) {
      formData.append(
        'imageFile',
        sobreMi.dataImage[i].file,
        sobreMi.dataImage[i].file.name
      );
    }

    return formData;
  }

  onUpdate(): void {
    const sobreMiFormData = this.prepareForData(this.sobreMi);

    const id = this.activatedRoute.snapshot.params['id'];

    this.ngxService.start();
    this.sobreMiService.editSobreMi(id, sobreMiFormData).subscribe(
      data => {
        this.ngxService.stop(),
        Swal.fire({
          title: 'SobreMi modificada correctamente',
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
        this.ngxService.stop(),
        Swal.fire({
          title: 'Error al modificar la sobreMi',
          icon: 'error',
          confirmButtonColor: '#297762',

          color: 'var(--text)',
          background: 'var(--background1)',

        });
      }
    );

  }



}
