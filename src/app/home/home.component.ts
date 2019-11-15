import { Component, OnInit } from '@angular/core';
import { HttpControl } from '../Service/HtttpControl';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer, Subscription } from 'rxjs';
import { ProfileHttp } from '../Service/ProfileHttp';
import { ManagementMakeProfile } from '../Service/ManagementProfile';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private MySubscription: Subscription;
  private MySubscription1: Subscription;
  private isconnected: boolean;
  private KleImeg: boolean;
  public url: string;
  public image: Blob;
  public data: any;
  public mysrc: string;
  public mysrc1: string;
  private UrlImage: { url: string }[];


  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public switchLoginRegistre = true;


  constructor(private http: HttpControl, private managementprofile: ManagementMakeProfile,
    // tslint:disable-next-line:align
    private phttp: ProfileHttp, ) {
    this.isconnected = false;
    this.KleImeg = true;
    this.url = '';

  }

  ngOnInit() {
    this.managementprofile.SetDrawerKey(false);
    this.managementprofile.SetDrawerMode('over');
    this.managementprofile.SetKleUpdateCv(false);
    this.managementprofile.SetDrawerKey(false);
    this.CheckConnection();
    this.getimage();
    /*this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();
    this.phttp.getimage();*/
  }
  // tslint:disable-next-line:use-lifecycle-interface
  /* ngDoCheck(): void {

     this.UrlImage = this.mngProfile.GetUrlIamge();
     console.log(this.UrlImage);
     if (this.UrlImage != null) {
       console.log('lenght: ' + this.UrlImage.length);
     }

   }*/
  CheckConnection() {
    let token: string;
    token = localStorage.getItem('token');
    if (token == null || token === 'null') {
      this.isconnected = false;
    } else {
      this.isconnected = true;
    }
  }

  private getimage() {
    console.log('---------------------------getting image-------------------------');
    this.http.getimage().subscribe(
      (resp) => {
        console.log(resp);
        console.log('---------------------------url-------------------------');
        this.url = resp.url;
        this.image = resp.body;
        console.log(this.url);
        console.log(this.image);
        /* var reader = new FileReader();
         reader.readAsDataURL(this.image);
         let data;
         reader.onloadend = () => {
           this.mysrc = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + reader.result);
           console.log("----------ssssssssssssssssssssssssssssssssssssssssssssssssss------------------------------")
           console.log(this.mysrc);
         };
         this.mysrc = reader.readAsBinarystring(this.image);

         console.log(this.mysrc);*/

        /*this.image = btoa(unescape(encodeURIComponent(resp.body)));
        console.log(this.image);
        this.mysrc = 'data:image/png;base64,' + this.image;
        console.log(this.mysrc);*/



      },
      (error) => {
        console.log('error');
        if (error != null) {
          console.log(error);
          console.log(error.error);
        }

      },
      () => {
        const MyObservale = new Observable((observer: Observer<string>) => {
          console.log('-----------begun suvscription----------');
          const reader = new FileReader();
          reader.readAsDataURL(this.image);
          reader.onloadend = () => {
            observer.next(reader.result as string);
            observer.complete();
          };

          setTimeout(() => {
            console.log('this is an error hahaha');
            observer.error('time out');

          }, 5000);

        });
        this.MySubscription = MyObservale.subscribe(
          (mysrc: string) => {
            console.log('we got the src of image');
            this.mysrc = mysrc;
            // console.log(this.mysrc);
          },
          () => { console.log('eroor'); },
          () => { console.log('Operation done'); }
        );
        console.log('getting Image Done');
        /*const data$ = new Observable(observer => {

          observer.next(1);
          observer.next(2);
          observer.error(new Error('Oups!'));
          observer.next(3);
          observer.complete();

        });

        data$.subscribe({
          next: value => console.log(value),
          error: error => console.error(error.tostring()),
          complete: () => console.log('DONE!')
        });*/
      }
    );

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this.MySubscription != null && this.MySubscription !== undefined) {
      this.MySubscription.unsubscribe();
    }

  }






  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  submit(form) {
    console.log(form);
    console.log(form.value.username);
  }



  Click() {

  }

}
