import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { SobreMi } from '../models/sobreMi';
import { ImageProcessingService } from '../Service/image-processing.service';
import { SobreMiService } from '../Service/sobre-mi.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  admin = false;
  roles!: string[];
  sobreMi: any[] = []

  constructor(
    private sobreMiService: SobreMiService,
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
    
    this.listarSobreMi();
  }

  listarSobreMi(){
    this.sobreMiService.getSobreMi()
    .pipe(
      map((x:SobreMi[], i) => x.map((sobreMi:SobreMi) => this.imageProcessingService.createImages(sobreMi)))
    )
    .subscribe(
      (data: SobreMi[]) => {
        this.sobreMi = data;
      },
      (err) => {
        console.log("error")
      }
    )
  }


  scrollR(){
    const productContainers = Array.from(document.querySelectorAll('.skill-container'));
  
    productContainers.forEach((item, i)=>{
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;
      item.scrollLeft += containerWidth;
    })
  }

  scrollL(){
    const productContainers = Array.from(document.querySelectorAll('.skill-container'));
  
    productContainers.forEach((item, i)=>{
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;
      item.scrollLeft -= containerWidth;
    })
  }

}
