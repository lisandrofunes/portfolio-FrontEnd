import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { ImageProcessingService } from '../Service/image-processing.service';
import { PortfolioService } from '../Service/portfolio.service';
import { TokenService } from '../Service/token.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  admin = false;
  roles!: string[];

  lista: any = []
  portfolioDetails: Portfolio[] = [];
  constructor(
    private portfolioService: PortfolioService,
    private imageProcessingService: ImageProcessingService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.listarPortfolios();
    // this.cargarImagen(this.lista);
    this.roles = this.token.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.admin = true;
      }
    })
  }

  listarPortfolios(){
    this.portfolioService.getPortfolio()
    .pipe(
      map((x:Portfolio[], i) => x.map((portfolio: Portfolio) => this.imageProcessingService.createImages(portfolio)))
    )
    .subscribe(
      (resp: Portfolio[]) => {
        this.portfolioDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log("Error: " + error);
      }
      // res=>{this.lista=res},
      // err=>console.log(err)
    );
  }

  // listarPortfolios() {
  //   this.portfolioService.getPortfolio().subscribe(
  //     res=>{(this.lista=res)},
  //     err=>console.log(err)
  //   )
  // }

  // cargarImagen(lista: Portfolio){
  //   this.imageProcessingService.createImages(lista)


  // }

  // showImages(portfolio: Portfolio){
  //   data:{
  //     images: portfolio.portfolioImages
  //   }
  // }

  // scrollR(){
  //   const productContainers = Array.from(document.querySelectorAll('.portfolio-container'));

  //   productContainers.forEach((item, i)=>{
  //     let containerDimensions = item.getBoundingClientRect();
  //     let containerWidth = containerDimensions.width;
  //     item.scrollLeft += containerWidth;
  //   })
  // }

  // scrollL(){
  //   const productContainers = Array.from(document.querySelectorAll('.portfolio-container'));

  //   productContainers.forEach((item, i)=>{
  //     let containerDimensions = item.getBoundingClientRect();
  //     let containerWidth = containerDimensions.width;
  //     item.scrollLeft -= containerWidth;
  //   })
  // }
}
