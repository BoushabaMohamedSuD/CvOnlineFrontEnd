import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

  userc: { username: String, password: String };
  constructor(private http: HttpClient) {
    this.userc = { username: "", password: "" };
  }

  getNameEmail() {
    return this.http.get('http://localhost:5236/Maven/user1');
  }
  postNameEmail(user: { pseudo: String, password: String }) {
    return this.http.post('http://localhost:5236/Maven/post', user);
  }
  LoginAuto(user: { pseudo: String, password: String }) {
    return this.http.post('http://localhost:5236/Maven/LoginAngular', user);
  }
  isConnected(user: { pseudo: String, password: String }) {
    return this.http.post('http://localhost:5236/Maven/isConnected', user);
  }
  LoginFromUrl(user: { pseudo: String, password: String }) {
    this.userc.username = user.pseudo;
    this.userc.password = user.password;
    return this.http.post('http://localhost:5236/Maven/login', this.userc);
  }
  isConnectedjwt(token: String) {
    /*let const1: string = "";
    let const2: string = "";
    let tokenConv: string = token as string;
    let tokenfinale: string = const1 + const2 + tokenConv;*/
    //const headers: Headers = new Headers({ 'Authorization': 'Bearer ' + localStorage.setItem('token', tokenConv) });
    //let head: HttpHeaders = new HttpHeaders().set("Authorization", "Bearer " + token);
    console.log("tooooookeeeeeeeeennnnnnn " + token)
    // const headers: Headers = new Headers().append('Authorization', `Bearer ${tokenConv}`);
    // console.log(tokenConv + "you see that");
    this.userc = { username: "sd", password: "dzqs" };


    let _headers = new HttpHeaders();
    let headersx = _headers.append('Content-Type', 'application/json')
      .append('Authorization', token as string);

    let cv: { title: String } = { title: "premier cv" };

    return this.http.post('http://localhost:5236/Maven/isConnectedjwt', cv, { headers: headersx });
  }
  getToken() {
    return this.http.get('http://localhost:5236/Maven/token');
  }




}
