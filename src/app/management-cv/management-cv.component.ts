import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ManagementMakeProfile } from '../Service/ManagementProfile';
import { ProfileHttp } from '../Service/ProfileHttp';
import { HttpControl } from '../Service/HtttpControl';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-management-cv',
  templateUrl: './management-cv.component.html',
  styleUrls: ['./management-cv.component.css']
})
export class ManagementCvComponent implements OnInit {
  public Cvs: { title: string, kleActive: boolean }[];
  private CvTitles: [{ id: number, title: string }];
  public inputActiveValue = '';
  public test = 'test';
  private MySubscription: Subscription;
  public url: string;
  public image: Blob;
  public data: any;
  public mysrc: string;
  public SrsImages: { cvId: number, src: string }[];
  public isLoaded: boolean;

  constructor(private managementprofile: ManagementMakeProfile,
    // tslint:disable-next-line:align
    private httpControle: HttpControl,
    // tslint:disable-next-line:align
    private profileHttp: ProfileHttp,
    // tslint:disable-next-line:align
    private router: Router,
    // tslint:disable-next-line:align
    private managementProfile: ManagementMakeProfile,


  ) {
    this.isLoaded = false;
    this.SrsImages = new Array<{ cvId: number, src: string }>();
    this.Cvs = new Array();
  }

  ngOnInit() {

    /*if (this.Cvs != null) {
      this.Cvs.push({ title: "Mohamed", kleActive: false });
      this.Cvs.push({ title: "Boushaba", kleActive: false });
      console.log("he isssssss noooot nuuuuuuuull");
    } else {
      console.log("he isssssss  nuuuuuuuull");
      this.Cvs = [{ title: "Mohamed", kleActive: false }];
      this.Cvs.push({ title: "Boushaba", kleActive: false });
    }*/
    this.managementprofile.SetKleTitle(false);
    this.managementprofile.SetKleUpdateCv(false);
    this.managementprofile.SetDrawerKey(false);
    this.managementprofile.SetDrawerMode('over');
    console.log('length of cvs ' + this.Cvs.length);
    console.log('--------show cv--------------------');
    const UserName = localStorage.getItem('Username');
    this.httpControle.showCv(UserName).subscribe(
      (resp) => {
        console.log(resp.body);
        this.CvTitles = resp.body as [{ id: number, title: string }];
        console.log('get all cv from the user');
        console.log(this.CvTitles);
        // tslint:disable-next-line:max-line-length
        this.SrsImages = new Array(this.CvTitles.length).fill({ cvId: -1, src: 'https://t3.ftcdn.net/jpg/01/51/57/66/500_F_151576654_IuN8FA80e6scZOf9MSmnjC65l99K2hyA.jpg' });
        this.getImageByIgd(0);
        /*let index = 0;
         while (index < this.CvTitles.length) {
            this.profileHttp.getimageById(this.CvTitles[index].id as number, index)
              .then((image) => {
                console.log('image ok');
                console.log(image.position);
                console.log('cvId: ' + this.CvTitles[image.position].id);
                const imagersult: { src: string, position: number } = image;
                console.log(this.SrsImages);
                this.SrsImages[imagersult.position] = { cvId: this.CvTitles[image.position].id, src: imagersult.src };
                console.log(this.SrsImages);
                if (image.position === this.CvTitles.length - 1) {
                  this.isLoaded = true;
                  this.managementprofile.SetImageSrc(this.SrsImages);
                }
              })
              .catch((onRejected => console.log('error getting image')));
            index++;
          }*/
      },
      (error) => { },
      () => {
        console.log('end Fitching');
        console.log('begun converting');
        let i = 0;
        while (i < this.CvTitles.length) {
          this.Cvs.push({ title: this.CvTitles[i].title as string, kleActive: false });
          i++;
        }
        this.managementprofile.SetCvs(this.Cvs);
      }
    );
    console.log('--------end show cv--------------------');
    // tslint:disable-next-line:max-line-length


  }

  getImageByIgd(index: number) {
    this.profileHttp.getimageById(this.CvTitles[index].id as number, index)
      .then((image) => {
        console.log('image ok');
        console.log(image.position);
        console.log('cvId: ' + this.CvTitles[image.position].id);
        const imagersult: { src: string, position: number } = image;
        console.log(this.SrsImages);
        const type = imagersult.src.split(';')[0];
        if (type === 'data:image/png') {
          this.SrsImages[imagersult.position] = { cvId: this.CvTitles[image.position].id, src: imagersult.src };
        } else {
          console.log('the file downloaded is not an image');
        }

        console.log(this.SrsImages);
        if (image.position === this.CvTitles.length - 1) {
          console.log('########end#############');
          this.isLoaded = true;
          this.managementprofile.SetImageSrc(this.SrsImages);
        } else {
          index++;
          this.getImageByIgd(index);
        }

      })
      .catch((onRejected => console.log('error getting image')));
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {

    if (!this.isLoaded) {
      setTimeout(() => {
        console.log(this.isLoaded);
      }, 500);
      setTimeout(() => {
        if (!this.isLoaded) {
          this.isLoaded = true;
          console.log('time out on server ');
        }

      }, 2000);
    }

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    // console.log(this.inputActiveValue + '#########');
    this.managementprofile.SetInputActiveVlaue(this.inputActiveValue);
  }


  Click(i: number, event: ElementRef) {
    console.log('the number of click is' + i);
    console.log(this.inputActiveValue + ' valueeeeeeeeeeeee!!!!!!!!!!!!!!!!!!!!!!!!');
    this.managementprofile.SetKleGeneralProfile(true);
    if (i >= 0) {
      let index = 0;
      for (const cv of this.Cvs) {
        if (index === i) {
          cv.kleActive = true;
          this.Cvs[index].kleActive = true;
          localStorage.setItem('CvTitle', cv.title);
          // tslint:disable-next-line:align
          localStorage.setItem('CvId', this.CvTitles[index].id as unknown as string);

        } else {
          cv.kleActive = false;
          this.Cvs[index].kleActive = false;

        }
        index++;

      }
      this.managementprofile.SetCvs(this.Cvs);
    } else {
      this.managementprofile.SetKleGeneralProfile(false);
      // tslint:disable-next-line:no-shadowed-variable
      let i = 0;
      for (const cv of this.Cvs) {
        cv.kleActive = false;
        this.Cvs[i].kleActive = false;
        i++;

      }
      this.managementprofile.SetCvs(this.Cvs);
    }

  }

  updateTitle() {
    console.log('-----Update Title------');
    const inputValue: string = this.inputActiveValue;
    const newCv: { title: string } = { title: inputValue };
    let i = 0;
    while (i < this.Cvs.length) {
      if (this.Cvs[i].kleActive === true) {
        const CvTitle = { title: this.Cvs[i].title };
        localStorage.setItem('CvTitle', CvTitle.title as string);
        break;
      }
      i++;
    }
    console.log('update title');
    this.profileHttp.updateTitle(newCv);

  }
  deleteCv(indexHTML: number, event: ElementRef) {
    console.log('-----Delete Cv------');
    console.log('the number of click is' + indexHTML);
    console.log(this.inputActiveValue + ' valueeeeeeeeeeeee!!!!!!!!!!!!!!!!!!!!!!!!');
    if (indexHTML >= 0) {
      let index = 0;
      for (const cv of this.Cvs) {
        if (index === indexHTML) {
          cv.kleActive = true;
          this.Cvs[index].kleActive = true;
          localStorage.setItem('CvTitle', cv.title);
          // tslint:disable-next-line:align
          localStorage.setItem('CvId', this.CvTitles[index].id as unknown as string);

        } else {
          cv.kleActive = false;
          this.Cvs[index].kleActive = false;

        }
        index++;

      }
      this.managementprofile.SetCvs(this.Cvs);
    } else {
      this.managementprofile.SetKleGeneralProfile(false);
      // tslint:disable-next-line:no-shadowed-variable
      let i = 0;
      for (const cv of this.Cvs) {
        cv.kleActive = false;
        this.Cvs[i].kleActive = false;
        i++;

      }
      this.managementprofile.SetCvs(this.Cvs);
    }

    const newCv: { title: string } = { title: localStorage.getItem('CvTitle') };
    this.profileHttp.deleteCv(newCv);
    localStorage.removeItem('CvTitle');
    localStorage.removeItem('CvId');
  }
  export(indexHTML: number, event: ElementRef) {
    console.log('export');
    this.Click(indexHTML, event);
    this.router.navigate(['/export']);

  }
  Update(indexHTML: number, event: ElementRef) {
    console.log('####UpadteCv###########');
    this.Click(indexHTML, event);
    this.managementProfile.SetKleTitle(true);
    this.managementProfile.SetKleUpdateCv(true);
    this.router.navigate(['/MakeProfile']);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.managementprofile.SetKleGeneralProfile(false);
  }



}
