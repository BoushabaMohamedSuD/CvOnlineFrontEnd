import { Component, OnInit } from '@angular/core';
import { NewComponentProfile } from 'src/app/Service/NewComponentProfile';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';
import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.css']
})
export class LangueComponent implements OnInit {
  step = -1;
  public isLoaded: boolean;
  private nbrLaungue: number;
  public nbrsLaungues: Array<number>;
  public curren: number;
  public Languages: [{
    language: string,
    level: string

  }];
  public language: {
    language: string,
    level: string

  };
  // tslint:disable-next-line:max-line-length
  constructor(private newComponentProfile: NewComponentProfile, private profilehttp: ProfileHttp, private managementProfile: ManagementMakeProfile) {
    this.isLoaded = false;
    this.nbrLaungue = 1;
    this.nbrsLaungues = Array(this.nbrLaungue).fill(4);
    this.curren = 0;
    this.language = {
      language: '',
      level: ''
    };
    this.Languages = [{
      language: '',
      level: ''
    }];

  }

  ngOnInit() {
    console.log('::::::::::::::on init::::::::::::::');
    console.log('kelTitle: ' + this.managementProfile.GetKleTitle());
    console.log('kleUpdateCv: ' + this.managementProfile.GetKleUpdateCv());
    if (this.managementProfile.GetKleTitle() && this.managementProfile.GetKleUpdateCv()) {
      this.profilehttp.showLanguague()
        .then((resp) => {
          //  console.log(result);
          if (resp != null) {
            let index = 0;
            while (true) {
              if (resp[index] === undefined) {
                break;
              }
              const elment: {
                language: string,
                level: string

              } = {
                language: resp[index].language,
                level: resp[index].level

              };
              if (index === 0) {
                this.Languages[0] = elment;
              } else {
                this.Languages.push(elment);
              }

              index++;
            }
            console.log(this.Languages);
            console.log(this.Languages[0].language);
            console.log(this.Languages.length);
            this.nbrLaungue = this.Languages.length;
            if (this.nbrLaungue === 0) {
              this.nbrLaungue = 1;
              this.Languages = [{
                language: '',
                level: ''
              }];
            }
            console.log(this.nbrLaungue);
            this.nbrsLaungues = Array(this.nbrLaungue).fill(4);
            this.newComponentProfile.setnbrLanguague(this.nbrLaungue);
            this.isLoaded = true;
          } else {
            this.Languages = [{
              language: '',
              level: ''
            }];
            this.nbrLaungue = this.newComponentProfile.getnbr().language;
            this.nbrsLaungues = Array(this.nbrLaungue).fill(4);
            this.newComponentProfile.setnbrLanguague(this.nbrLaungue);
            this.isLoaded = true;

          }

        })
        .catch((err) => {
          console.log(err);
          this.Languages = [{
            language: '',
            level: ''
          }];
          this.nbrLaungue = this.newComponentProfile.getnbr().language;
          this.nbrsLaungues = Array(this.nbrLaungue).fill(4);
          this.newComponentProfile.setnbrLanguague(this.nbrLaungue);
          this.isLoaded = true;
        });
    } else {
      this.Languages = [{
        language: '',
        level: ''
      }];
      this.nbrLaungue = this.newComponentProfile.getnbr().language;
      this.nbrsLaungues = Array(this.nbrLaungue).fill(4);
      this.newComponentProfile.setnbrLanguague(this.nbrLaungue);
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

  pass(i: number) {
    console.log('number: ' + i);
    this.curren = i;
  }
  public newCompetence() {
    this.step++;
    console.log('new Formation');
    this.nbrLaungue = this.newComponentProfile.addLanguage();
    this.nbrsLaungues = Array(this.nbrLaungue).fill(4);
    this.Languages.push({
      language: '',
      level: ''
    });
    console.log('Competence: ' + this.nbrLaungue);


  }
  public deleteCompetence(i: number) {
    console.log('------deleting----------');
    console.log('delete language index of ' + i);
    console.log('the curren number of lanuage now is  ' + this.newComponentProfile.getnbr().language);
    this.nbrLaungue = this.newComponentProfile.deleteLanguage();
    this.nbrsLaungues = Array(this.nbrLaungue).fill(4);

    this.Languages.splice(i, 1);

    console.log('Language: ' + this.nbrLaungue);


  }



  ChangeInput(i: number, event) {
    console.log(i);
    console.log('value of event ' + event.target.value);
    console.log('name of event: ' + event.target.name);
    if (event.target.name === 'language') {
      this.Languages[i].language = event.target.value;
    } else if (event.target.name === 'level') {
      this.Languages[i].level = event.target.value;
    }

    let index = 0;
    console.log('----begun fetching');
    while (index < this.Languages.length) {
      console.log('index of competence:' + index);
      console.log('value: ' + this.Languages[index].language);
      console.log('index of index:' + index);
      console.log('value: ' + this.Languages[index].level);
      index++;
    }
    console.log('----end fetching------');


  }



  SubmiteSimple() {
    console.log('---------submiteLangue--------------');
    this.profilehttp.addLanguage(this.Languages);

  }
  setStep(index: number) {
    this.step = index;
    console.log(this.step + ' !!! langue');
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
