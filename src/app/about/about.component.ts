import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
