import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, SimpleChanges, DebugElement } from '@angular/core';
import { ServiceTest } from '../Service/ServiceTest';
import { Style } from '../Service/Style';
import { HttpInterceptor } from '@angular/common/http';
import { HttpControl } from '../Service/HtttpControl';
import { LoginRegistre } from '../Service/Login&Registre';
import { Router } from '@angular/router';
import { ManagementMakeProfile } from '../Service/ManagementProfile';
import { MatDrawer } from '@angular/material';



// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isconnected: boolean;
  private style1;
  private style2;
  public styleLocal;
  @Output() public styleEmit;
  public test = 'linkNav2';
  // for style3 style4 by usein stleservice
  public styleService: { navbar: string, input: string };
  private style3: { navbar: string, input: string };
  private style4: { navbar: string, input: string };
  private Drawer: MatDrawer;
  private key: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(private servicestyle: Style, private checkLogin: LoginRegistre, private router: Router, private managementProfile: ManagementMakeProfile) {
    this.isconnected = false;
    this.styleLocal = new EventEmitter<{ navstyle: string, linkstyle: string }>();
    this.styleEmit = new EventEmitter<{ bodystyle: string }>();
    this.style1 = { navstyle: 'bg-dark', linkstyle: 'linkNav1', bodystyle: 'body1' };
    this.style2 = { navstyle: 'bg-danger', linkstyle: 'linkNav2', bodystyle: 'body2' };
    this.styleLocal.navstyle = this.style1.navstyle;
    this.styleLocal.linkstyle = this.style1.linkstyle;
    // for style3 style4 by usein stleservice
    this.style3 = { navbar: 'span1', input: 'input1' };
    this.style4 = { navbar: 'span2', input: 'input2' };
    this.styleService = this.style3;
    this.Drawer = null;
    this.key = true;


  }

  ngOnInit() {
    console.log('::::::::::navbar init::::::::::::');
    this.CheckConnection();
    console.log('isconnected: ' + this.isconnected);
    this.Drawer = this.managementProfile.GetDrawer();
    console.log(this.Drawer);
    console.log(this.router.url);
    const urlactive = this.router.url as string;
    console.log(urlactive);
    console.log('::::::::::nav end init::::::::::::');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    this.CheckConnection();
    // console.log('isconnected: ' + this.isconnected);
  }
  OnChangeStyle(button: string) {


    console.log('style change');
    console.log(button);
    if (button === 'style1') {
      this.styleLocal.navstyle = this.style1.navstyle;
      this.styleLocal.linkstyle = this.style1.linkstyle;
      this.styleEmit.emit('body1');
      console.log(this.styleLocal.linkstyle + 'has been emit');
      // changeStyleUrl("1");

    } else {
      this.styleLocal.navstyle = this.style2.navstyle;
      this.styleLocal.linkstyle = this.style2.linkstyle;
      this.styleEmit.emit('body2');
      console.log(this.styleLocal.linkstyle + 'has been emit');
      // changeStyleUrl("2");
    }
  }
  OnChangeStyleService(button: string) {
    console.log('style service change');
    if (button === 'style3') {
      this.servicestyle.ChangeStyleService(this.style3);
      this.styleService = this.servicestyle.GetStyleService();
      console.log('style3');

    } else if (button === 'style4') {
      this.servicestyle.ChangeStyleService(this.style4);
      this.styleService = this.servicestyle.GetStyleService();
      console.log('style4');
    }

  }

  changehome(home: HTMLLinkElement) {
    console.log(home.classList);


  }

  CheckConnection() {
    let token: string;
    token = localStorage.getItem('token');
    // console.log('-------token form nav bar check---------');
    // console.log(token);
    if (token == null || token === 'null') {
      this.isconnected = false;
    } else {
      this.isconnected = true;
    }
  }
  addCv() {
    this.managementProfile.SetKleTitle(false);
    this.managementProfile.SetKleUpdateCv(false);
    this.managementProfile.SetKleMakeProfile(0);
  }

  logout() {
    console.log('logout');
    this.isconnected = false;
    localStorage.clear();
    this.router.navigate(['/home']);

  }
  toggleDrawer() {
    console.log('toglle drawer');
    this.Drawer.toggle();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    if (this.key) {
      console.log('::::::::::nav after view::::::::::::');
      this.Drawer = this.managementProfile.GetDrawer();
      console.log(this.Drawer);
      if (this.Drawer != null && this.Drawer !== undefined) {
        this.key = false;
      }
      console.log('::::::::::nav end view::::::::::::');
    }

  }


}
