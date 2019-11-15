import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProfileHttp } from '../Service/ProfileHttp';
import { ManagementMakeProfile } from '../Service/ManagementProfile';
declare var jsPDF: any;
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-cv-export',
  templateUrl: './cv-export.component.html',
  styleUrls: ['./cv-export.component.css']
})
export class CvExportComponent implements OnInit {
  public SrsImages: { cvId: number, src: string }[];
  private isLoading: boolean;
  private OperationDone: boolean;
  public Competences: [{
    competence: string,
    level: string

  }];
  public Formations: {
    id: number
    formation: string,
    establishement: string,
    yearsBegun: string,
    mounthsBegun: string,
    yearsLast: string,
    mounthsLast: string,
    certificate: string
  }[];
  public InfoPersonal: {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    adress: string,
    nbrtele: string,
    image: string
  };
  public Languages: {
    language: string,
    level: string,
    percentage: number

  }[];
  public Leisures: {
    leisur: string

  }[];

  constructor(
    private profileHttp: ProfileHttp,
    private mngProfile: ManagementMakeProfile,
    private managementprofile: ManagementMakeProfile
  ) {
    this.SrsImages = new Array();
    this.isLoading = false;
    this.OperationDone = false;
    this.InfoPersonal = {
      id: 0,
      firstname: 'Null',
      lastname: 'Null',
      email: 'Null@gmail.com',
      adress: 'Null',
      nbrtele: 'Null',
      image: 'https://t3.ftcdn.net/jpg/01/51/57/66/500_F_151576654_IuN8FA80e6scZOf9MSmnjC65l99K2hyA.jpg'
    };
    this.Formations = new Array<{
      id: number,
      formation: string,
      establishement: string,
      yearsBegun: string,
      mounthsBegun: string,
      yearsLast: string,
      mounthsLast: string,
      certificate: string
    }>();
    this.Languages = new Array<{
      language: string,
      level: string,
      percentage: number

    }>();
    this.Leisures = new Array<{
      leisur: string

    }>();

  }

  ngOnInit() {
    this.managementprofile.SetKleUpdateCv(false);
    this.managementprofile.SetDrawerKey(false);
    this.profileHttp.showPersonalInfo()
      .then((personalInfo) => {
        console.log(personalInfo);
        this.InfoPersonal = personalInfo;
        this.SrsImages = this.mngProfile.GetImageSrc();
        console.log(this.SrsImages);
        console.log('CvId: ' + localStorage.getItem('CvId'));
        let index = 0;
        let key = false;
        while (index < this.SrsImages.length) {
          if (localStorage.getItem('CvId') === '' + this.SrsImages[index].cvId) {
            console.log('cv image success');
            this.InfoPersonal.image = this.SrsImages[index].src;
            console.log(this.InfoPersonal);
            key = true;
            break;
          }
          index++;
        }
        if (!key) {
          console.log('error');
        }
        this.profileHttp.showFormation()
          .then((formations) => {
            this.Formations = formations;
            console.log(this.Formations[0]);
            this.profileHttp.showCompetence()
              .then((competence) => {
                this.Competences = competence;
                console.log(this.Competences[0]);
                this.profileHttp.showLanguague()
                  .then((language) => {
                    this.Languages = language;

                    console.log(this.Languages[0]);
                    this.profileHttp.showLeisure()
                      .then((leisure) => {
                        this.Leisures = leisure;
                        console.log(this.Leisures[0]);
                        let indexLanguage = 0;
                        while (indexLanguage < this.Languages.length) {
                          if (this.Languages[indexLanguage].level === 'Expert') {
                            this.Languages[indexLanguage].percentage = 95;
                          } else if (this.Languages[indexLanguage].level === 'Pro') {
                            this.Languages[indexLanguage].percentage = 80;
                          } else if (this.Languages[indexLanguage].level === 'Normale') {
                            this.Languages[indexLanguage].percentage = 70;
                          } else if (this.Languages[indexLanguage].level === 'Beginner') {
                            this.Languages[indexLanguage].percentage = 50;
                          } else {
                            this.Languages[indexLanguage].percentage = 0;
                          }
                          indexLanguage++;
                        }
                        console.log(this.Languages);
                        this.isLoading = true;
                      })
                      .catch(err => console.log('Error'));
                  })
                  .catch(err => console.log('error'));

              })
              .catch(err => console.log('error'));

          })
          .catch(err => console.log('error'));

      })
      .catch(onRejected => console.log('error'));

    // this.work();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    if (!this.isLoading) {
      setTimeout(() => {
        console.log('Loading ...');
      }, 500);
    }
    if (!this.OperationDone) {
      if (this.isLoading) {
        this.OperationDone = true;
        setTimeout(() => {
          console.log(':::::::Converting to PDF:::::::');

          const data = document.getElementById('CV___1');
          html2canvas(data, {
            width: 790.619485,
            height: 1118.153874,
            x: 13,
            y: 72,
            allowTaint: true,
            useCORS: true

          }).then(canvas => {
            // Few necessary setting options
            const imgWidth = 1980;

            //  const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgHeight = 720;


            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            const contentDataURL = canvas.toDataURL('image/png');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();
            console.log(contentDataURL);
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, width, height);
            pdf.save('MYPdf.pdf'); // Generated PDF

          }).catch((err) => {
            console.log('error making pdf');
            console.log(err);
          });
        }, 100);


      }
    }


  }

  work() {
    console.log(':::::::Converting to PDF:::::::');

    const data = document.getElementById('CV___1');
    html2canvas(data, {
      width: 790.619485,
      height: 1118.153874,
      x: 0,
      y: 180,
    }).then(canvas => {
      // Few necessary setting options
      const imgWidth = 1980;

      //  const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgHeight = 720;


      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const contentDataURL = canvas.toDataURL('image/png');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      console.log(contentDataURL);
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, width, height);
      pdf.save('MYPdf.pdf'); // Generated PDF

    }).catch(() => console.log('error making pdf'));

  }

}
