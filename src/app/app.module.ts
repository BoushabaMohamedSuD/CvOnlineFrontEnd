import { ProjectComponent } from './make-profile/project/project.component';
import { InfoPersonelComponent } from './make-profile/info-personel/info-personel.component';
import { LeisureComponent } from './make-profile/leisure/leisure.component';
import { LangueComponent } from './make-profile/langue/langue.component';
import { TitleComponent } from './make-profile/title/title.component';
import { QuikLookComponent } from './make-profile/quik-look/quik-look.component';
import { CompetenceComponent } from './make-profile/competence/competence.component';
import { FormationComponent } from './make-profile/formation/formation.component';
import { MakeProfileComponent } from './make-profile/make-profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginRegistreComponent } from './login-registre/login-registre.component';
import { GeneralBehaivorComponent } from './general-behaivor/general-behaivor.component';
import { IndexControlDirective } from './directive/index-control.directive';
import { ServiceTest } from './Service/ServiceTest';
import { ServiceTestInjectable } from './Service/ServiceTestInjectable';
import { Style } from './Service/Style';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routuing.module';

import { LoginRegistre } from './Service/Login&Registre';
import { HttpService } from './Service/HttpServiceTest';
import { HttpControl } from './Service/HtttpControl';

import { NewComponentProfile } from './Service/NewComponentProfile';

import { HttpClientModule } from '@angular/common/http';
import { ManagementCvComponent } from './management-cv/management-cv.component';
import { ManagementMakeProfile } from './Service/ManagementProfile';

import { ProfileHttp } from './Service/ProfileHttp';
import { CvExportComponent } from './cv-export/cv-export.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent, NavBarComponent, LoginRegistreComponent, GeneralBehaivorComponent,
    // tslint:disable-next-line:max-line-length
    IndexControlDirective, HomeComponent, ContactUsComponent, MakeProfileComponent, InfoPersonelComponent,
    // tslint:disable-next-line:max-line-length
    FormationComponent, CompetenceComponent, LangueComponent, LeisureComponent, ProjectComponent, ManagementCvComponent,
    QuikLookComponent, TitleComponent, CvExportComponent],

  imports: [BrowserModule, HttpModule, FormsModule, AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
  providers: [Style, HttpService, LoginRegistre, HttpControl, NewComponentProfile, ManagementMakeProfile, ProfileHttp],
  bootstrap: [AppComponent],


})
export class AppModule { }
