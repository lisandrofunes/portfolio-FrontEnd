import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { AddComponent } from './skills/add/add.component';
import { EditComponent as SkillsEdit} from './skills/edit/edit.component';
import { UpdateComponent } from './skills/update/update.component';
import { PorfolioEditComponent } from './portfolio/edit/portfolioEdit.component'
import { PortfolioAddComponent } from './portfolio/portfolio-add/portfolio-add.component';
import { PortfolioUpdateComponent } from './portfolio/portfolio-update/portfolio-update.component';
import { MainUpdateComponent } from './main/main-update/main-update.component';
import { AboutComponent } from './about/about.component';
import { AboutUpdateComponent } from './about/about-update/about-update.component';

const routes: Routes = [
  {path: 'portafolio', component: PortafolioComponent},
  {path: 'auth', component: LoginComponent},
  {path: 'habilidad/create', component: AddComponent},
  {path: 'habilidad', component: SkillsEdit},
  {path: 'habilidad/update/:id', component:UpdateComponent},
  {path: 'portfolio', component: PorfolioEditComponent},
  {path: 'portfolio/create', component: PortfolioAddComponent},
  {path: 'portfolio/update/:id', component: PortfolioUpdateComponent},
  {path: 'persona/update/:id', component: MainUpdateComponent},
  {path: 'sobreMi', component: AboutComponent},
  {path: 'sobreMi/update/:id', component: AboutUpdateComponent},
  {path: '', redirectTo: '/portafolio', pathMatch:'full'},
  // { path: '**', component: PortafolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
