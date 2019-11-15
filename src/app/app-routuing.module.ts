import { TitleComponent } from './make-profile/title/title.component';
import { QuikLookComponent } from './make-profile/quik-look/quik-look.component';
import { ProjectComponent } from './make-profile/project/project.component';
import { LeisureComponent } from './make-profile/leisure/leisure.component';
import { LangueComponent } from './make-profile/langue/langue.component';
import { CompetenceComponent } from './make-profile/competence/competence.component';
import { FormationComponent } from './make-profile/formation/formation.component';
import { InfoPersonelComponent } from './make-profile/info-personel/info-personel.component';
import { MakeProfileComponent } from './make-profile/make-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegistreComponent } from './login-registre/login-registre.component';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GeneralBehaivorComponent } from './general-behaivor/general-behaivor.component';

import { ManagementCvComponent } from './management-cv/management-cv.component';

import { CvExportComponent } from './cv-export/cv-export.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'export', component: CvExportComponent },
  { path: 'contact_us', component: ContactUsComponent },
  { path: 'login&registre', component: LoginRegistreComponent },
  { path: 'MnagementCv', component: ManagementCvComponent },
  { path: 'MakeProfile', component: MakeProfileComponent },
  { path: 'PersonaleInfo', component: InfoPersonelComponent },
  { path: 'Formation', component: FormationComponent },
  { path: 'Competence', component: CompetenceComponent },
  { path: 'Language', component: LangueComponent },
  { path: 'Leisure', component: LeisureComponent },
  { path: 'Project', component: ProjectComponent },
  { path: 'QuikLook', component: QuikLookComponent },
  { path: 'title', component: TitleComponent },


  { path: '**', redirectTo: '/home', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
