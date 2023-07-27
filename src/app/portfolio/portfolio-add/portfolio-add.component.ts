import { Component, OnInit,  } from '@angular/core';
import { DomSanitizer,  } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileHandle } from 'src/app/models/file-handle.model';
import { Portfolio } from 'src/app/models/portfolio';
import { PortfolioService } from 'src/app/Service/portfolio.service';
import { SkillsService } from 'src/app/Service/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './portfolio-add.component.html',
  styleUrls: ['./portfolio-add.component.css', '../../../ng-multiselect-dropdown.theme.scss']
  
})
export class PortfolioAddComponent implements OnInit {
  dropdownList:any[] = [];

  portfolio: Portfolio = {
    title: "",
    description: "",
    habilidad: [],
    dataImage: [],
    url: ""
  } 

  constructor(
    private skillService: SkillsService,
    private ngxService: NgxUiLoaderService,
    private sanitizer: DomSanitizer,
    private portfolioService: PortfolioService,
    private router: Router
  ){}


  selectedItems = [];
  dropdownSettings = {};

  ngOnInit(){

    this.getData();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombre',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      searchPlaceholderText: 'Buscar',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
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

  removeImages(i:number){
    this.portfolio.dataImage.splice(i,1)    
  }

  addPortfolio() {
    const portfolioFormData = this.prepareForData(this.portfolio)

    this.ngxService.start();
    this.portfolioService.addPortfolio(portfolioFormData).subscribe(
      data => {
        this.ngxService.stop();
        Swal.fire({
          title: 'Portafolio añadido correctamente',
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
          title: 'Error al añadir el portafolio',
          icon: 'error',
          confirmButtonColor: '#297762',
          color: 'var(--text)',
          background: 'var(--background1)',
        });
      }
    );
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