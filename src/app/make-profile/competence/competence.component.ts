import { element } from 'protractor';
import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';
import { Component, OnInit } from '@angular/core';
import { NewComponentProfile } from 'src/app/Service/NewComponentProfile';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit {
  step = -1;
  public isLoaded: boolean;
  private nbrCompetence: number;
  public nbrsCompetences: Array<number>;
  public curren: number;
  public Competences: [{
    competence: string,
    level: string

  }];
  public competence: {
    competence: string,
    level: string

  };
  constructor(private newComponentProfile: NewComponentProfile,
    // tslint:disable-next-line:align
    private profilehttp: ProfileHttp,
    // tslint:disable-next-line:align
    private managementProfile: ManagementMakeProfile,
  ) {
    this.nbrCompetence = 1;
    this.nbrsCompetences = Array(this.nbrCompetence).fill(4);
    this.curren = 0;
    this.isLoaded = false;


    this.competence = {
      competence: '',
      level: ''
    };
    this.Competences = [{
      competence: '',
      level: ''
    }];

  }

  ngOnInit() {
    console.log('::::::::::::::on init::::::::::::::');
    console.log('kelTitle: ' + this.managementProfile.GetKleTitle());
    console.log('kleUpdateCv: ' + this.managementProfile.GetKleUpdateCv());
    if (this.managementProfile.GetKleTitle() && this.managementProfile.GetKleUpdateCv()) {
      this.profilehttp.showCompetence()
        .then((resp) => {
          //  console.log(result);
          if (resp != null) {
            let index = 0;
            while (true) {
              if (resp[index] === undefined) {
                break;
              }
              const elment: {
                competence: string,
                level: string

              } = {
                competence: resp[index].competence,
                level: resp[index].level

              };
              if (index === 0) {
                this.Competences[0] = elment;
              } else {
                this.Competences.push(elment);
              }

              index++;
            }
            console.log(this.Competences);
            console.log(this.Competences[0].competence);
            console.log(this.Competences.length);
            this.nbrCompetence = this.Competences.length;
            if (this.nbrCompetence === 0) {
              this.nbrCompetence = 1;
              this.Competences = [{
                competence: '',
                level: ''
              }];
            }
            console.log(this.nbrCompetence);
            this.nbrsCompetences = Array(this.nbrCompetence).fill(4);
            this.newComponentProfile.setnbrCompetence(this.nbrCompetence);
            this.isLoaded = true;
          } else {
            this.nbrCompetence = this.newComponentProfile.getnbr().competence;
            this.nbrsCompetences = Array(this.nbrCompetence).fill(4);
            this.newComponentProfile.setnbrCompetence(this.nbrCompetence);
            this.isLoaded = true;
          }

        })
        .catch((err) => {
          console.log(err);
          this.Competences = [{
            competence: '',
            level: ''
          }];
          this.nbrCompetence = this.newComponentProfile.getnbr().competence;
          this.nbrsCompetences = Array(this.nbrCompetence).fill(4);
          this.newComponentProfile.setnbrCompetence(this.nbrCompetence);
          this.isLoaded = true;
        });
    } else {
      this.Competences = [{
        competence: '',
        level: ''
      }];
      this.nbrCompetence = this.newComponentProfile.getnbr().competence;
      this.nbrsCompetences = Array(this.nbrCompetence).fill(4);
      this.newComponentProfile.setnbrCompetence(this.nbrCompetence);
      this.isLoaded = true;
    }

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {

    setTimeout(() => {
    }, 500);

  }

  pass(i: number) {
    console.log('number: ' + i);
    this.curren = i;
  }
  public newCompetence() {
    this.step++;
    console.log('new Formation');
    this.nbrCompetence = this.newComponentProfile.addCompetence();
    this.nbrsCompetences = Array(this.nbrCompetence).fill(4);
    this.Competences.push({
      competence: '',
      level: ''
    });
    console.log('Competence: ' + this.nbrCompetence);


  }
  public deleteCompetence(i: number) {
    console.log('------deleting----------');
    console.log('delete Formation index of ' + i);
    this.nbrCompetence = this.newComponentProfile.deleteCompetence();
    this.nbrsCompetences = Array(this.nbrCompetence).fill(4);

    this.Competences.splice(i, 1);

    console.log('Formation: ' + this.nbrCompetence);


  }



  ChangeInput(i: number, event) {
    console.log(i);
    console.log('value of event ' + event.target.value);
    console.log('name of event: ' + event.target.name);
    if (event.target.name === 'competence') {
      this.Competences[i].competence = event.target.value;
    } else if (event.target.name === 'level') {
      this.Competences[i].level = event.target.value;
    }

    let index = 0;
    console.log('----begun fetching');
    while (index < this.Competences.length) {
      console.log('index of competence:' + index);
      console.log('value: ' + this.Competences[index].competence);
      console.log('index of index:' + index);
      console.log('value: ' + this.Competences[index].level);
      index++;
    }
    console.log('----end fetching------');


  }



  SubmiteSimple() {
    console.log('---------submitecompetnece--------------');
    this.profilehttp.addCompetence(this.Competences);

  }

  setStep(index: number) {

    this.step = index;
    console.log(this.step + ' !!! competnece');
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
