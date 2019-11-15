import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ServiceTest } from '../Service/ServiceTest';
import { Style } from '../Service/Style';
import { Router } from '@angular/router';
import { HttpService } from '../Service/HttpServiceTest';

import { NgForm, NgModel, FormControl, Validators } from '@angular/forms';
import { LoginRegistre } from '../Service/Login&Registre';
import { Response } from '@angular/http';
import { ContactUsComponent } from '../contact-us/contact-us.component';



@Component({
  selector: 'app-login-registre',
  templateUrl: './login-registre.component.html',
  styleUrls: ['./login-registre.component.css']
})
export class LoginRegistreComponent implements OnInit {
  private name: string;
  private kle: boolean;
  private kleClick: boolean;
  private dataUser: { pseudo: string, password: string };
  public style: string;
  private token: string;
  private valideemail: boolean;
  @Input() public styleCssLogin;
  @ViewChild('email', { static: false }) input: HTMLInputElement;
  public styleService: { navbar: string, input: string };
  public ErrorBackendLogin: { ErrorUsername: string, ErrorPassword: string };
  public ErrorBackendRegistre: { ErrorUsername: string, ErrorPassword: string, ErrorCPassword: string, ErrorEmail: string };
  public ErrorUsername: boolean;
  public ErrorPassword: boolean;
  public ErrorUsernameRegistre: boolean;
  public ErrorPasswordRegistre: boolean;
  public ErrorCPasswordRegistre: boolean;
  public ErrorEmailRegistre: boolean;
  public isconnected: boolean;



  public hide = true;
  public emailValidator = new FormControl('', [Validators.required, Validators.email]);
  public switchLoginRegistre = true;



  constructor(private servicestyle: Style,
    // tslint:disable-next-line:align
    private router: Router, private httpService: HttpService,
    // tslint:disable-next-line:align
    private loginregistre: LoginRegistre, private mngp: ManagementMakeProfile) {


    this.name = 'Mohamed';
    this.kle = false;
    this.kleClick = false;
    this.style = 'OrButton';
    this.dataUser = { pseudo: '', password: '' };
    this.valideemail = true;
    this.ErrorBackendLogin = { ErrorUsername: 'ErrorNull', ErrorPassword: 'ErrorNull' };
    // tslint:disable-next-line:max-line-length
    this.ErrorBackendRegistre = { ErrorUsername: 'ErrorNull', ErrorPassword: 'ErrorNull', ErrorCPassword: 'ErrorNull', ErrorEmail: 'ErrorNull' };
    this.ErrorUsername = false;
    this.ErrorPassword = false;
    this.ErrorUsernameRegistre = false;
    this.ErrorPasswordRegistre = false;
    this.ErrorCPasswordRegistre = false;
    this.ErrorEmailRegistre = false;
    this.isconnected = false;
    /*this.dataUser.pseudo = 'Mriame';
    this.dataUser.email = "mar2009@gmail.com";*/
    /*this.styleService = { navbar: "span1", input: "input1" };
    console.log(this.styleService.input + "xxxxxxxxxxxxxxxxxxxxx");*/

  }

  ngOnInit() {
    console.log('########login############"');
    this.mngp.SetKleUpdateCv(false);
    this.mngp.SetDrawerKey(false);
    console.log(this.router.url);
    this.mngp.SetDrawerMode('over');
    this.mngp.SetDrawerKey(true);
    this.CheckConnection();
    console.log('initiale Login');
    this.loginregistre.setError('');
    console.log('Error Email: ' + this.ErrorEmailRegistre);

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {

    this.styleService = this.servicestyle.GetStyleService();
    /* if (this.input != null) {
       console.log(this.input.value);
     }*/
    let Error: string;
    Error = this.loginregistre.getError();
    console.log('Error: ' + Error);
    if (Error === 'usernameWrong') {
      console.log('usernameWrong');
      this.ErrorBackendLogin.ErrorUsername = 'ErrorValideInput';
      this.ErrorBackendLogin.ErrorPassword = 'ErrorValideInput';
      this.ErrorUsername = true;
      this.ErrorPassword = true;
    } else if (Error === 'passwordWrong') {
      console.log('passwordWrong');
      this.ErrorBackendLogin.ErrorPassword = 'ErrorValideInput';
      this.ErrorBackendLogin.ErrorUsername = 'ErrorNull';
      this.ErrorUsername = false;
      this.ErrorPassword = true;
    } else if (Error === 'EmailWrong') {
      console.log('EmailWrong');
      this.ErrorBackendRegistre.ErrorEmail = 'ErrorValideInput';
      this.ErrorBackendRegistre.ErrorPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorUsername = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorCPassword = 'ErrorNull';
      this.ErrorUsernameRegistre = false;
      this.ErrorPasswordRegistre = false;
      this.ErrorCPasswordRegistre = false;
      this.ErrorEmailRegistre = true;
    } else if (Error === 'PasswordWrong') {
      console.log('PasswordWrong');
      this.ErrorBackendRegistre.ErrorPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorUsername = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorCPassword = 'ErrorValideInput';
      this.ErrorBackendRegistre.ErrorEmail = 'ErrorNull';
      this.ErrorUsernameRegistre = false;
      this.ErrorPasswordRegistre = false;
      this.ErrorCPasswordRegistre = true;
      this.ErrorEmailRegistre = false;


    } else if (Error === 'AccountExiste') {
      console.log('AccountExiste');
      this.ErrorBackendRegistre.ErrorPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorUsername = 'ErrorValideInput';
      this.ErrorBackendRegistre.ErrorCPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorEmail = 'ErrorValideInput';
      this.ErrorUsernameRegistre = true;
      this.ErrorPasswordRegistre = false;
      this.ErrorCPasswordRegistre = false;
      this.ErrorEmailRegistre = true;
    } else if (Error === 'EmailPasswordWrong') {
      console.log('EmailPasswordWrong');
      this.ErrorBackendRegistre.ErrorPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorUsername = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorCPassword = 'ErrorValideInput';
      this.ErrorBackendRegistre.ErrorEmail = 'ErrorValideInput';
      this.ErrorUsernameRegistre = false;
      this.ErrorPasswordRegistre = false;
      this.ErrorCPasswordRegistre = true;
      this.ErrorEmailRegistre = true;
    } else {
      console.log('Nothing');
      this.ErrorBackendLogin.ErrorUsername = 'ErrorNull';
      this.ErrorBackendLogin.ErrorPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorUsername = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorCPassword = 'ErrorNull';
      this.ErrorBackendRegistre.ErrorEmail = 'ErrorNull';
      this.ErrorPassword = false;
      this.ErrorUsername = false;
      this.ErrorUsernameRegistre = false;
      this.ErrorPasswordRegistre = false;
      this.ErrorCPasswordRegistre = false;
      this.ErrorEmailRegistre = false;
      console.log('Error Email: ' + this.ErrorEmailRegistre);
    }



  }
  inputemail(em: NgModel) {
    // console.log(em.value)
  }
  public OnClick(event: Event): string {

    console.log('clickFromConsole');
    console.log(event.type);
    this.style = 'OrButtonClickAngular';
    this.defaultsystem();
    return this.style;
  }
  private defaultsystem() {
    setTimeout(() => {
      this.style = 'OrButton';

    }, 3000);
  }


  submit(form: NgForm) {
    console.log('submit');
    console.log(form.value.email + ' this is an email ');
    console.log(form.value.username + ' this is username ');
    if (form.value.email != null) {
      this.loginregistre.submiteRegistre(form);
    } else {
      this.loginregistre.submitLogin(form);
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






  isConnectedjwt() {

    console.log('----------------debut de connection jwt-------------');
    this.token = localStorage.getItem('token');
    console.log(this.token + ' this is my faucking token');
    this.httpService.isConnectedjwt(this.token).subscribe(
      (resp: Response) => {
        // console.log(resp.text());
      },
      (error) => { console.log(error); },


    );
    console.log('fin de connection jwt');
  }




  getErrorMessage() {
    return this.emailValidator.hasError('required') ? 'You must enter a value' :
      this.emailValidator.hasError('email') ? 'Not a valid email' :
        '';
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    console.log('###########"login destroy############');
    this.mngp.SetDrawerKey(false);
    this.mngp.SetDrawerMode('push');

  }


  /*postTest() {
    console.log("begin post !!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.dataUser.pseudo = 'Mriame';
    this.dataUser.password = "mar2009@gmail.com";

    this.httpService.postNameEmail(this.dataUser).subscribe(
      (resp: Response) => {

      },
      (error) => console.log(error)
    );
    console.log(this.dataUser.pseudo + " : " + this.dataUser.password);
    console.log("end post !!!!!!!!!!!!!!!!!!!!!!!!!!!");

  }*/














  /*
  getToken(){
    let token: string = localStorage.getItem("token");
    console.log("this is my token " + token);
  }*/





  /*
    sendTest() {
      console.log("send data ");
      this.httpService.getNameEmail().subscribe(
        (resp: Response) => {
          const data = resp.json();
          this.dataUser = data;
          console.log(data);
        },
        (error) => console.log(error)
      );
      console.log(this.dataUser.pseudo + " : " + this.dataUser.password);

    }

    LoginAuto() {
      console.log("begin auto Login !!!!!!!!!!!!!!!!!!!!!!!");
      this.dataUser.pseudo = 'a';
      this.dataUser.password = "a";

      this.httpService.LoginAuto(this.dataUser).subscribe(
        (resp: Response) => {
          console.log(resp.headers);
        },
        (error) => console.log(error)
      );
      console.log(this.dataUser.pseudo + " : " + this.dataUser.password);
      console.log("end AutoLogin !!!!!!!!!!!!!!!!!!!!!!!!!!!");


    }
    isConnected() {
      console.log("begin is connected !!!!!!!!!!!!!!!!!!!!!!!");

      this.dataUser.pseudo = 'a';
      this.dataUser.password = "a";

      this.httpService.isConnected(this.dataUser).subscribe(
        (resp: Response) => {
          console.log(resp.text());
        },
        (error) => console.log(error)
      );
      console.log(this.dataUser.pseudo + " : " + this.dataUser.password);
      console.log("end is connected !!!!!!!!!!!!!!!!!!!!!!!!!!!");



    }

    LoginFromUrl() {
      console.log("begin is LoginFromUrl !!!!!!!!!!!!!!!!!!!!!!!");

      this.dataUser.pseudo = 'a';
      this.dataUser.password = 'a';

      this.httpService.LoginFromUrl(this.dataUser).subscribe(
        (resp: Response) => {
          console.log(resp + " this is response");
        },
        (error) => console.log(error)
      );
      console.log(this.dataUser.pseudo + " : " + this.dataUser.password);
      console.log("end LoginFromurl !!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    getToken() {

      this.httpService.getToken().subscribe(
        (resp: Response) => {
          console.log("waiting for token");
          console.log(resp.text());
          this.token = resp.text();
          console.log(this.token + "return");

          console.log("waiting token done");

        },
        (error) => { console.log(error); },
        () => {
          console.log("begun connection");
          this.isConnectedjwt();
        }
      );
      console.log(this.token + "return");

    } */
}
