import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PorfolioEditComponent } from './portfolio/edit/portfolioEdit.component';
import { SkillsComponent } from './skills/skills.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './skills/edit/edit.component';
import { UpdateComponent } from './skills/update/update.component';
import { AddComponent } from './skills/add/add.component';
import { PortfolioAddComponent } from './portfolio/portfolio-add/portfolio-add.component';
import { PortfolioUpdateComponent } from './portfolio/portfolio-update/portfolio-update.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainUpdateComponent } from './main/main-update/main-update.component';
import { AboutUpdateComponent } from './about/about-update/about-update.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#2da379",
  "fgsColor": "#2da379",
  "pbColor": "#2da379",
  "text": "Cargando...",
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    PortfolioComponent,
    PorfolioEditComponent,
    SkillsComponent,
    PortafolioComponent,
    LoginComponent,
    EditComponent,
    UpdateComponent,
    AddComponent,
    PortfolioAddComponent,
    PortfolioUpdateComponent,
    MainUpdateComponent,
    AboutUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
