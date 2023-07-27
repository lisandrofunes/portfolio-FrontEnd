import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../models/file-handle.model';
import { Portfolio } from '../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(data: any){

    const portfolioImages: any[] = data.dataImage;
    // console.log("port ima " + JSON.stringify( portfolio.portfolioImages))

    const portfolioImagesToFileHandle: FileHandle[] = [];

    for (let i = 0; i < portfolioImages.length; i++){
      const imageFileData = portfolioImages[i];

      const imageBlob = this.dataURIBlob(imageFileData.picByte, imageFileData.type);
      
      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      portfolioImagesToFileHandle.push(finalFileHandle);
    }

    data.dataImage = portfolioImagesToFileHandle;
    return data;
  }

  public dataURIBlob(picByte: any, imageType: any) {
    const byteString = window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i=0; i<byteString.length; i++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type: imageType});
    return blob;
  }
}
