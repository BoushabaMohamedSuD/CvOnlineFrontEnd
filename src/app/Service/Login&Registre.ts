import { Injectable } from '@angular/core';
import { HttpControl } from './HtttpControl';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Injectable()
export class LoginRegistre {
  private userLogin: { username: string, password: string };
  private userRegistre: { username: string, password: string, email: string, confirm_password: string };
  private isConnected: boolean;
  private Error: string;

  constructor(private httpControl: HttpControl, private router: Router) {
    this.userLogin = { username: '', password: '' };
    this.userRegistre = { username: '', password: '', email: '', confirm_password: '' };
    this.isConnected = false;

  }
  submitLogin(form: NgForm) {
    if (form.valid) {
      console.log('form valide');
      if ((form.value.username != null && form.value.password != null) &&
        ((form.value.username !== '' && form.value.password !== ''))) {
        this.userLogin.username = form.value.username;
        this.userLogin.password = form.value.password;
        console.log(this.userLogin.username + ' ' + this.userLogin.password);
        this.httpControl.SubmiteLogin(this.userLogin).subscribe(
          (resp) => {
            console.log('--------------begue login in the backend-------------');
            console.log(resp);
            console.log(resp.headers);
            const response = resp.headers.get('Error');
            if (response != null) {
              console.log('tokenfetched from backend ' + response);
            } else {
              console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            }

            const tokensave: string = resp.headers.get('Authorization');
            console.log(tokensave + 'token save');
            this.saveToken(tokensave);

          },
          (error) => {
            console.log('--------------Error Catching-------------');
            console.log(error.headers.get('Error'));
            this.Error = error.headers.get('Error');
          },
          () => this.getToken()
        );
      }
    } else {
      console.log('form not valide');
    }


  }

  submiteRegistre(form: NgForm) {
    if (form.valid) {
      this.Error = '';
      console.log('form valide');
      if ((form.value.username != null && form.value.password != null && form.value.email != null && form.value.confirm_password != null) &&
        ((form.value.username !== '' && form.value.password !== '' && form.value.email !== '' && form.value.confirm_password !== ''))) {
        this.userRegistre.username = form.value.username;
        this.userRegistre.email = form.value.email;
        this.userRegistre.password = form.value.password;
        this.userRegistre.confirm_password = form.value.confirm_password;
        if (this.userRegistre.password !== this.userRegistre.confirm_password) {
          console.log('please confirme your password');
          this.Error = 'PasswordWrong';
        } else {
          let isvalid = false;

          this.httpControl.SubmiteRegistre(this.userRegistre).subscribe(
            (resp) => {
              isvalid = resp.body as boolean;
              console.log('response' + resp);
              console.log('body response is ' + resp.body);
              console.log('body type is ' + resp.body.toString);

              this.Error = resp.headers.get('Error');
              console.log('isvalid: ' + isvalid);
              if (isvalid === true) {
                console.log('registre succesfly from invalide');
              } else {
                console.log('probleme with registration');
              }
              if (resp.body) {
                console.log('registre succesfly from resp');
              } else {
                console.log('probleme with registration frm resp');
              }
            },
            (error) => console.log(error),
            () => {
              if (isvalid === true) {
                this.userLogin.username = this.userRegistre.username;
                this.userLogin.password = this.userRegistre.password;
                console.log('begiun autoLogin');
                this.autoLogin();
              }

            }
          );
        }
      }
    } else {
      console.log('form not valide');
    }


  }
  autoLogin() {
    console.log('begun auto login');
    console.log(this.userLogin.username + ' ' + this.userLogin.password);
    this.httpControl.SubmiteLogin(this.userLogin).subscribe(
      (resp) => {
        console.log('begue login in the backend');
        console.log(resp.headers.get('Authorization'));
        // tslint:disable-next-line:ban-types
        const tokensave: string = resp.headers.get('Authorization');
        this.saveToken(tokensave);
        console.log('Error: ' + resp.headers.get('Error'));
        this.Error = resp.headers.get('Error');

      },
      (error) => {
        console.log(error.headers.get('Error'));
        this.Error = error.headers.get('Error');
      },
      () => this.getToken()
    );
  }

  getToken() {
    console.log('fetch token');
    const token: string = localStorage.getItem('token');
    console.log('this is my token ' + token);
    if (token != null && token !== '' && token !== 'null') {
      this.isConnected = true;
      console.log('clienthas been connected');
      localStorage.setItem('Username', this.userLogin.username as string);
      this.router.navigate(['/home']);
    } else {
      console.log('error authentication');
      this.router.navigate(['/login&registre']);
    }


  }
  saveToken(tokensave: string) {
    console.log('-------------save token ---------------');
    console.log('save toknen ' + tokensave);
    localStorage.setItem('token', tokensave as string);
  }
  getError(): string {
    return this.Error;
  }
  setError(Error: string) {
    this.Error = Error;
  }



}
