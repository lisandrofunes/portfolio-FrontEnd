import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  preferedColorScheme:any = window.matchMedia('(prefers-color-scheme: dark-theme)').matches ? 'dark-theme' : 'light-theme';
  theme:any = localStorage.getItem('theme') || this.preferedColorScheme;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    var element = <HTMLInputElement> document.getElementById("checktheme");

    if (localStorage.getItem('theme') === 'dark-theme'){
      element.checked = true;
      console.log("check")
    } 
    else{
      element.checked = false;
      console.log("uncheck")
    }
    this.initializeTheme();
    
  }

  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      localStorage.getItem('theme') === 'dark-theme' ? (this.theme = 'light-theme'): (this.theme = 'dark-theme')
      // this.theme === 'light-theme'
      //   ? (this.theme = 'dark-theme')
      //   : (this.theme = 'light-theme')
    );
    this.setTheme();
  }

  initializeTheme = (): void =>
    this.renderer.addClass(this.document.body, this.theme);
    

  setTheme(){
    localStorage.setItem('theme', this.theme)
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}



// export type Theme = 'light-theme' | 'dark-theme';

