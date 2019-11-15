import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/Service/HttpServiceTest';
import { HttpControl } from 'src/app/Service/HtttpControl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';
import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';

@Component({
  selector: 'app-info-personel',
  templateUrl: './info-personel.component.html',
  styleUrls: ['./info-personel.component.css']
})
export class InfoPersonelComponent implements OnInit {
  image: File;

  private isconnected: boolean;
  public InfoPersonal: {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    adress: string,
    nbrtele: string,
    image: string
  };
  public isLoaded: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private httpControl: HttpControl, private http: HttpClient, private profilehttp: ProfileHttp, private managementProfile: ManagementMakeProfile, ) {
    this.InfoPersonal = { id: 0, firstname: '', lastname: '', email: '', adress: '', nbrtele: '', image: '' };
    this.isconnected = false;
    this.image = null;
    this.isLoaded = false;
  }

  ngOnInit() {
    this.CheckConnection();
    console.log('::::::::::::::on init::::::::::::::');
    console.log('kelTitle: ' + this.managementProfile.GetKleTitle());
    console.log('kleUpdateCv: ' + this.managementProfile.GetKleUpdateCv());
    if (this.managementProfile.GetKleTitle() && this.managementProfile.GetKleUpdateCv()) {
      this.profilehttp.showPersonalInfo()
        .then((resp) => {
          /*console.log(resp);
          console.log(resp.lastname);*/
          if (resp != null) {
            this.InfoPersonal.id = resp.id;
            this.InfoPersonal.lastname = resp.lastname;
            this.InfoPersonal.firstname = resp.firstname;
            this.InfoPersonal.adress = resp.adress;
            this.InfoPersonal.email = resp.email;
            this.InfoPersonal.image = resp.image;
            this.InfoPersonal.nbrtele = resp.nbrtele;
            console.log(this.InfoPersonal);
            this.isLoaded = true;
          } else {
            this.isLoaded = true;
          }

        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.isLoaded = true;
    }
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      setTimeout(() => {

      }, 500);
    }

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
  setimage(event) {
    console.log('event:' + event);
    console.log('type event: ' + event.type);
    this.image = event.target.files[0];
    console.log('image: ' + this.image);
    console.log('image name' + this.image.name);
    // console.log(event);
  }

  Submite(form: NgForm) {
    console.log('-------submit in fo personal---------');
    console.log(this.InfoPersonal.nbrtele);
    const imageFormData = new FormData();
    if (this.image != null) {
      console.log(this.image);

      console.log('name: ' + this.image.name);
      imageFormData.append('image', this.image, this.image.name);
    }
    this.profilehttp.addInfoPersonal(form, this.image.name, imageFormData);

  }



















  submite(form: NgForm) {
    // this.image = form.value.picture.target.file[0];
    // console.log(event);
    if (this.image != null) {
      console.log(this.image);
      const imageFormData = new FormData();
      console.log('name: ' + this.image.name);
      imageFormData.append('image', this.image, this.image.name);
      // this.httpControl.SubmitePersonalInfo();
      let token: string;
      token = localStorage.getItem('token');
      const xheaders = new HttpHeaders();
      const headersx = xheaders
        .append('Authorization', token as string);

      const t: { username: string, imag: FormData } = { username: 'heho', imag: imageFormData };
      this.http.post('http://localhost:5236/Maven/begunUpload', imageFormData, { headers: headersx, observe: 'response' }).subscribe(
        (resp) => {
          console.log('upload');
          console.log(resp);
        },
        (error) => {
          console.log(error.headers.get('Error'));
        },
        () => console.log('done')
      );

    } else {
      console.log('null');
    }


  }

}
