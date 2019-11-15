import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';

@Component({
  selector: 'app-make-profile',
  templateUrl: './make-profile.component.html',
  styleUrls: ['./make-profile.component.css']
})
export class MakeProfileComponent implements OnInit {
  private CurrentRout: string;
  public KleMakeProfile: number;
  public GeneralKleUpdateTitles;
  public kletitle: boolean;
  private CvTitle: { title: string };
  public Cvs: { title: string, kleActive: boolean }[];
  step = -1;
  constructor(private rout: Router, private mangementProfile: ManagementMakeProfile, private profileHttp: ProfileHttp) {
    this.CurrentRout = '';
    this.GeneralKleUpdateTitles = false;

  }

  ngOnInit() {
    this.mangementProfile.SetDrawerKey(false);
    this.mangementProfile.SetDrawerMode('over');
    this.GeneralKleUpdateTitles = this.mangementProfile.GetKleGeneralProfile();
    this.KleMakeProfile = this.mangementProfile.GetKleMakeProfile();
    this.GeneralKleUpdateTitles = this.mangementProfile.GetKleGeneralProfile();
    this.kletitle = this.mangementProfile.GetKleTitle();
    this.CurrentRout = this.rout.url as string;
    this.Cvs = this.mangementProfile.GetCvs();
    console.log('the current rout is ' + this.CurrentRout);
    if (this.CurrentRout === '/MnagementCv/MakeProfile') {
      this.KleMakeProfile = 1;
      this.mangementProfile.SetKleMakeProfile(1);
      console.log('kle make profilke ' + this.KleMakeProfile);
    } else if (this.CurrentRout === '/MakeProfile') {
      this.KleMakeProfile = 0;
      this.mangementProfile.SetKleMakeProfile(0);
    }
    // this.profileHttp.showFormation();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {

    this.KleMakeProfile = this.mangementProfile.GetKleMakeProfile();
    this.GeneralKleUpdateTitles = this.mangementProfile.GetKleGeneralProfile();
    this.kletitle = this.mangementProfile.GetKleTitle();
    /* console.log('after check kleMakeProfile' + this.KleMakeProfile);
     console.log('after check GeneralkleUpdateTitles' + this.GeneralKleUpdateTitles);*/
    this.Cvs = this.mangementProfile.GetCvs();

  }
  updateTitle() {
    console.log('-----Update Title------');
    const inputValue: string = this.mangementProfile.GetInptActiveValue();
    const newCv: { title: string } = { title: inputValue };
    let i = 0;
    while (i < this.Cvs.length) {
      if (this.Cvs[i].kleActive === true) {
        this.CvTitle = { title: this.Cvs[i].title };
        localStorage.setItem('CvTitle', this.CvTitle.title as string);
        break;
      }
      i++;
    }
    console.log('update title');
    this.profileHttp.updateTitle(newCv);

  }
  deleteCv() {
    console.log('-----Delete Cv------');
    const inputValue: string = this.mangementProfile.GetInptActiveValue();
    const newCv: { title: string } = { title: inputValue };
    let i = 0;
    console.log(this.Cvs);
    while (i < this.Cvs.length) {
      if (this.Cvs[i].kleActive === true) {
        this.CvTitle = { title: this.Cvs[i].title };
        localStorage.setItem('CvTitle', this.CvTitle.title as string);
        break;
      }
      i++;
    }
    console.log('update title');
    this.profileHttp.deleteCv(newCv);
  }
  quikLook() {
    console.log('----Quik Look--------');
    this.KleMakeProfile = 2;
    this.mangementProfile.SetKleMakeProfile(2);
    console.log('kleMmakeProfile ' + this.KleMakeProfile);

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

    // localStorage.removeItem("CvTitle");
  }
  updateCv() {
    this.mangementProfile.SetKleUpdateCv(true);
    this.mangementProfile.SetKleMakeProfile(0);
    this.mangementProfile.SetKleTitle(true);
    this.rout.navigate(['/MakeProfile/title']);
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
