import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NewComponentProfile } from 'src/app/Service/NewComponentProfile';
import { Router } from '@angular/router';
import { HttpControl } from 'src/app/Service/HtttpControl';
import { HttpClient } from '@angular/common/http';
import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';
import { NgForm, NgModel } from '@angular/forms';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  private isconnected: boolean;
  private kletitle: boolean;
  private CvTitle: { title: string };
  private CvTitles: [{ title: string }];
  public inputValue: string;
  /* @ViewChild('input', { static: false })
   private input: ElementRef;
   private kleInputAfterView: boolean;*/
  constructor(private managementProfile: ManagementMakeProfile, private profileHttp: ProfileHttp) {
    this.isconnected = false;
    this.kletitle = false;
    // this.kleInputAfterView = false;


  }

  ngOnInit() {
    console.log('init!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('init!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    this.CheckConnection();
    this.kletitle = this.managementProfile.GetKleTitle();
    if (this.kletitle) {
      this.inputValue = localStorage.getItem('CvTitle');
      console.log(this.inputValue + ' form local storage');
    }

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    /* console.log(this.input.nativeElement);
     this.kleInputAfterView = true;
     this.input.nativeElement.value = "heloo";*/
    if (this.kletitle) {
      this.inputValue = localStorage.getItem('CvTitle');
      console.log(this.inputValue + ' form local storage');
    }


  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    // tslint:disable-next-line:max-line-length
    // Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.
    this.kletitle = this.managementProfile.GetKleTitle();
    /* if (this.kleInputAfterView) {
       console.log(this.input.nativeElement.value);
     }*/

  }

  CheckConnection() {
    let token: string;
    token = localStorage.getItem('token');
    if (token == null) {
      this.isconnected = false;
    } else {
      this.isconnected = true;
    }
  }

  addTitleOrUpdate(form: NgForm) {
    console.log('------add or update title--------');
    if (this.kletitle) {
      // update a title
      this.CvTitle = { title: form.value.title };
      console.log('update title');
      this.profileHttp.updateTitle(this.CvTitle);

    } else {
      // add title
      this.kletitle = true;
      this.managementProfile.SetKleTitle(true);
      this.managementProfile.SetKleUpdateCv(false);
      this.CvTitle = { title: form.value.title };
      console.log('title of cv ' + this.CvTitle.title);
      this.profileHttp.addTtile(this.CvTitle);



    }

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    console.log('destroy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('destroy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');


  }


}
