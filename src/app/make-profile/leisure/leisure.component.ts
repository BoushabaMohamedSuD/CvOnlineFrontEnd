import { Component, OnInit } from '@angular/core';
import { NewComponentProfile } from 'src/app/Service/NewComponentProfile';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';
import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';

@Component({
  selector: 'app-leisure',
  templateUrl: './leisure.component.html',
  styleUrls: ['./leisure.component.css']
})
export class LeisureComponent implements OnInit {
  step = -1;
  public isLoaded: boolean;
  private nbrLeisure: number;
  public nbrsLeisures: Array<number>;
  public curren: number;
  public Leisures: [{
    leisur: string

  }];
  public leisure: {
    leisur: string,

  };
  // tslint:disable-next-line:max-line-length
  constructor(private newComponentProfile: NewComponentProfile, private profilehttp: ProfileHttp, private managementProfile: ManagementMakeProfile) {
    this.isLoaded = false;
    this.nbrLeisure = 1;
    this.nbrsLeisures = Array(this.nbrLeisure).fill(4);
    this.curren = 0;
    this.leisure = {
      leisur: ''

    };
    this.Leisures = [{
      leisur: ''
    }];

  }

  ngOnInit() {
    console.log('::::::::::::::on init::::::::::::::');
    console.log('kelTitle: ' + this.managementProfile.GetKleTitle());
    console.log('kleUpdateCv: ' + this.managementProfile.GetKleUpdateCv());
    if (this.managementProfile.GetKleTitle() && this.managementProfile.GetKleUpdateCv()) {
      this.profilehttp.showLeisure()
        .then((resp) => {
          //  console.log(result);
          if (resp != null) {
            let index = 0;
            while (true) {
              if (resp[index] === undefined) {
                break;
              }
              const elment: {
                leisur: string,

              } = {
                leisur: resp[index].leisur,


              };
              if (index === 0) {
                this.Leisures[0] = elment;
              } else {
                this.Leisures.push(elment);
              }

              index++;
            }
            console.log(this.Leisures);
            console.log(this.Leisures[0].leisur);
            console.log(this.Leisures.length);
            this.nbrLeisure = this.Leisures.length;
            if (this.nbrLeisure === 0) {
              this.nbrLeisure = 1;
              this.Leisures = [{
                leisur: '',

              }];
            }
            console.log(this.nbrLeisure);
            this.nbrsLeisures = Array(this.nbrLeisure).fill(4);
            this.newComponentProfile.setnbrLeisure(this.nbrLeisure);
            this.isLoaded = true;
          } else {
            this.Leisures = [{
              leisur: '',

            }];
            this.nbrLeisure = this.newComponentProfile.getnbr().leisure;
            this.nbrsLeisures = Array(this.nbrLeisure).fill(4);
            this.newComponentProfile.setnbrLeisure(this.nbrLeisure);
            this.isLoaded = true;
          }

        })
        .catch((err) => {
          console.log(err);
          this.Leisures = [{
            leisur: '',

          }];
          this.nbrLeisure = this.newComponentProfile.getnbr().leisure;
          this.nbrsLeisures = Array(this.nbrLeisure).fill(4);
          this.newComponentProfile.setnbrLeisure(this.nbrLeisure);
          this.isLoaded = true;
        });
    } else {
      this.Leisures = [{
        leisur: '',

      }];
      this.nbrLeisure = this.newComponentProfile.getnbr().leisure;
      this.nbrsLeisures = Array(this.nbrLeisure).fill(4);
      this.newComponentProfile.setnbrLeisure(this.nbrLeisure);
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
    this.nbrLeisure = this.newComponentProfile.addLeisure();
    this.nbrsLeisures = Array(this.nbrLeisure).fill(4);
    this.Leisures.push({
      leisur: '',

    });
    console.log('Competence: ' + this.nbrLeisure);


  }
  public deleteCompetence(i: number) {
    console.log('------deleting----------');
    console.log('delete Formation index of ' + i);
    this.nbrLeisure = this.newComponentProfile.deleteLeisure();
    this.nbrsLeisures = Array(this.nbrLeisure).fill(4);

    this.Leisures.splice(i, 1);

    console.log('Formation: ' + this.nbrLeisure);


  }



  ChangeInput(i: number, event) {
    console.log(i);
    console.log('value of event ' + event.target.value);
    console.log('name of event: ' + event.target.name);
    if (event.target.name === 'leisure') {
      this.Leisures[i].leisur = event.target.value;
    }

    let index = 0;
    console.log('----begun fetching');
    while (index < this.Leisures.length) {
      console.log('index of competence:' + index);
      console.log('value: ' + this.Leisures[index].leisur);
      index++;
    }
    console.log('----end fetching------');


  }



  SubmiteSimple() {
    console.log('---------submiteLeisure--------------');
    this.profilehttp.addLeisure(this.Leisures);

  }

  setStep(index: number) {
    this.step = index;
    console.log(this.step + ' !!! leisure');
  }

  nextStep() {

    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
