import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { map } from 'rxjs';
import { FileHandle } from 'src/app/models/file-handle.model';
import { Portfolio } from 'src/app/models/portfolio';
import { ImageProcessingService } from 'src/app/Service/image-processing.service';
import { PortfolioService } from 'src/app/Service/portfolio.service';
import { SkillsService } from 'src/app/Service/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio-update',
  templateUrl: './portfolio-update.component.html',
  styleUrls: ['./portfolio-update.component.css']
})
export class PortfolioUpdateComponent implements OnInit {
  dropdownList:any[] = [];

  portfolio: Portfolio = {
    title: "",
    description: "",
    habilidad: [],
    dataImage: [],
    url: ""
  }

  constructor(
    private portfolioService: PortfolioService,
    private skillService: SkillsService,
    private ngxService: NgxUiLoaderService,
    private imageProcessingService: ImageProcessingService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'nombre',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  ngOnInit(): void {
    this.portfolioDetails();
    this.getData();
  }

  portfolioDetails(){
    const id = this.activatedRoute.snapshot.params['id'];

    this.ngxService.start();

    this.portfolioService.detail(id)
    .subscribe(
      (data) => {
        this.ngxService.stop();
        this.portfolio = this.imageProcessingService.createImages(data);
      },
      (err) => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al actualizar el portafolio',
          icon: 'error',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      }
    )
  }

  removeImages(i:number){
    this.portfolio.dataImage.splice(i,1)
  }


  onUpdate(): void { 
    const portfolioFormData = this.prepareForData(this.portfolio);

    const id = this.activatedRoute.snapshot.params['id'];

    this.ngxService.start();
    this.portfolioService.addPortfolio(portfolioFormData).subscribe(
      data => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Portafolio modificado correctamente',
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
            this.router.navigate(['/portfolio']);
          } 
        })
      },
      err => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Error al modificar el portafolio',
          icon: 'error',
          confirmButtonColor: '#297762',

          color: 'var(--text)',
          background: 'var(--background1)',

        });
      }
    );
  
  }

  onItemSelect($event: any){
    console.log('$event is ', $event); 
  }

  getData(): void {
    let tmp: any[] = []
    this.skillService.getHabilidades().subscribe(data => {
      for(let i=0; i < data.length; i++) {
        tmp.push({ id: data[i].id, nombre: data[i].nombre, imagen: data[i].imagen });
      }
      this.dropdownList = tmp;
    });
  }

  prepareForData(portfolio: Portfolio): FormData {
    const formData = new FormData();

    formData.append(
      'portfolio',
      new Blob([JSON.stringify(portfolio)], { type: 'application/json' })
    );
  
    for (var i = 0; i < portfolio.dataImage.length; i++) {
      formData.append(
        'imageFile',
        portfolio.dataImage[i].file,
        portfolio.dataImage[i].file.name
      );
    }

    return formData;
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

      this.portfolio.dataImage.push(fileHandle);
    }
  }

}
