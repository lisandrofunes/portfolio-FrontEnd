import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }
  
  scrollR(){
    const productContainers = Array.from(document.querySelectorAll('.portfolio-container'));
  
    productContainers.forEach((item, i)=>{
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;
      item.scrollLeft += containerWidth;
    })
  }

  scrollL(){
    const productContainers = Array.from(document.querySelectorAll('.portfolio-container'));
  
    productContainers.forEach((item, i)=>{
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;
      item.scrollLeft -= containerWidth;
    })
  }
}
