import { Router, ActivatedRoute } from '@angular/router';
import { ManagementMakeProfile } from './Service/ManagementProfile';
import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContent } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer', { static: false }) Drawer: MatDrawer;
  private key: boolean;
  private key1: boolean;
  public title = 'FirstApp';
  public style = 'style1';
  public mode: string;
  public keymode: boolean;
  private lastUrl: string;

  constructor(private mngProfile: ManagementMakeProfile, private router: Router, private route: ActivatedRoute) {
    this.key = true;
    this.mode = 'push';
    this.keymode = false;
    this.key1 = true;
    this.lastUrl = '/';
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    console.log(this.router.url);
    console.log(this.route.url);
    if (this.router.url === '/login&registre') {
      console.log('#########################');
      this.mode = 'over';
      this.keymode = true;
    } else {
      console.log('#######nnnnnnnnnn###############');
      this.mode = 'push';
      this.keymode = false;
    }
  }
  changestyle(style: string) {
    this.style = style;
    console.log(style + 'from app component');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    if (this.key) {
      console.log('::::::::::app after view::::::::::::');
      console.log(this.router.url);
      console.log(this.Drawer);
      this.mngProfile.SetDrawer(this.Drawer);

      console.log('::::::::::app end view::::::::::::');
      this.key = false;
    }
    /*
    if (this.key1) {
      if (this.router.url !== this.lastUrl) {
        this.lastUrl = this.router.url;
        this.key1 = false;
      }
      this.keymode = this.mngProfile.GetDraweKeyr();
      this.mode = this.mngProfile.GetDrawerMode();
    }*/
    this.keymode = this.mngProfile.GetDraweKeyr();
    this.mode = this.mngProfile.GetDrawerMode();



  }
  onActivate(event, content: MatDrawerContent) {
    // for the main scroll but remimber you have a side bar
    //  window.scroll(0, 0);
    // or document.body.scrollTop = 0;
    // or document.querySelector('body').scrollTo(0,0)
    // for the side bar
    console.log('::::::::::::::::::::::::::router activated:::::::::::::::::');
    console.log(content.measureScrollOffset('top'));
    content.scrollTo({ top: 0 });


  }

}


function newFunction(): string {
  return 'app-root';
}
