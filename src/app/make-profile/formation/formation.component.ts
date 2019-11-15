import { ManagementMakeProfile } from 'src/app/Service/ManagementProfile';

import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { NewComponentProfile } from 'src/app/Service/NewComponentProfile';
import { NgForm, NgModel, FormArray } from '@angular/forms';
import { ProfileHttp } from 'src/app/Service/ProfileHttp';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  step = -1;
  private nbrFormation: number;
  public nbrsFormations: Array<number>;
  public curren: number;
  private file: File;
  private datas: FormData[];
  private nameDatas: string[];
  public isLoaded: boolean;
  public FormationsArray: {
    formation: string,
    establishement: string,
    yearsBegun: string,
    mounthsBegun: string,
    yearsLast: string,
    mounthsLast: string,
    certificate: string
  }[];


  // for testing
  private GeneraleData: FormData = new FormData();

  public Formations: [{
    formation: string,
    establishement: string,
    yearsBegun: string,
    mounthsBegun: string,
    yearsLast: string,
    mounthsLast: string
  }];
  public formation: {
    formation: string,
    establishement: string,
    yearsBegun: string,
    mounthsBegun: string,
    yearsLast: string,
    mounthsLast: string
  };
  constructor(private newComponentProfile: NewComponentProfile,
    // tslint:disable-next-line:align
    private profileHttp: ProfileHttp,
    // tslint:disable-next-line:align
    private managementProfile: ManagementMakeProfile
  ) {
    this.isLoaded = false;
    this.nbrFormation = 1;
    this.nbrsFormations = Array(this.nbrFormation).fill(4);
    this.curren = 0;
    this.datas = new Array();
    this.nameDatas = new Array();

    this.formation = {
      formation: '',
      establishement: '',
      yearsBegun: '',
      mounthsBegun: '',
      yearsLast: '',
      mounthsLast: ''
    };
    this.Formations = [{
      formation: '',
      establishement: '',
      yearsBegun: '',
      mounthsBegun: '',
      yearsLast: '',
      mounthsLast: ''
    }];
    this.FormationsArray = new Array<{
      formation: string,
      establishement: string,
      yearsBegun: string,
      mounthsBegun: string,
      yearsLast: string,
      mounthsLast: string,
      certificate: string
    }>();

  }

  ngOnInit() {
    console.log('::::::::::::::on init::::::::::::::');
    if (this.managementProfile.GetKleTitle() && this.managementProfile.GetKleUpdateCv()) {
      this.profileHttp.showFormation()
        .then((resp) => {
          console.log('resp frmation!!!!!!!!!');
          console.log(resp);
          //  console.log(result);
          if (resp != null) {
            let index = 0;
            while (true) {
              if (resp[index] === undefined) {
                break;
              }
              const elment = {
                formation: resp[index].formation,
                establishement: resp[index].establishement,
                yearsBegun: resp[index].yearsBegun,
                mounthsBegun: resp[index].mounthsBegun,
                yearsLast: resp[index].yearsLast,
                mounthsLast: resp[index].mounthsLast,
                certificate: resp[index].certificate
              };
              const elementformation = {
                formation: resp[index].formation,
                establishement: resp[index].establishement,
                yearsBegun: resp[index].yearsBegun,
                mounthsBegun: resp[index].mounthsBegun,
                yearsLast: resp[index].yearsLast,
                mounthsLast: resp[index].mounthsLast,
              };
              this.FormationsArray.push(elment);

              if (index === 0) {
                this.Formations[0] = elementformation;
              } else {
                this.Formations.push(elementformation);
              }

              index++;
            }
            console.log(this.FormationsArray);
            console.log(this.FormationsArray[0].formation);
            console.log(this.FormationsArray.length);
            this.nbrFormation = this.FormationsArray.length;
            if (this.nbrFormation === 0) {
              this.nbrFormation = 1;
              this.FormationsArray = [{
                formation: '',
                establishement: '',
                yearsBegun: '',
                mounthsBegun: '',
                yearsLast: '',
                mounthsLast: '',
                certificate: ''
              }];
            }
            console.log(this.nbrFormation);
            this.nbrsFormations = Array(this.nbrFormation).fill(4);
            this.newComponentProfile.setnbrFomration(this.nbrFormation);
            console.log(this.nbrsFormations.length + '++++++++++++++++++');
            console.log(this.FormationsArray.length + '++++++++++++++++++');
            this.isLoaded = true;
          } else {
            console.log('resp is null in formation');
            this.FormationsArray = [{
              formation: '',
              establishement: '',
              yearsBegun: '',
              mounthsBegun: '',
              yearsLast: '',
              mounthsLast: '',
              certificate: ''
            }];
            this.nbrFormation = this.newComponentProfile.getnbr().formation;
            this.nbrsFormations = Array(this.nbrFormation).fill(4);
            this.newComponentProfile.setnbrFomration(this.nbrFormation);
            this.isLoaded = true;
          }

        })
        .catch((err) => {
          console.log(err);
          this.FormationsArray = [{
            formation: '',
            establishement: '',
            yearsBegun: '',
            mounthsBegun: '',
            yearsLast: '',
            mounthsLast: '',
            certificate: ''
          }];
          this.nbrFormation = this.newComponentProfile.getnbr().formation;
          this.nbrsFormations = Array(this.nbrFormation).fill(4);
          this.newComponentProfile.setnbrFomration(this.nbrFormation);
          this.isLoaded = true;
        });
    } else {
      this.FormationsArray = [{
        formation: '',
        establishement: '',
        yearsBegun: '',
        mounthsBegun: '',
        yearsLast: '',
        mounthsLast: '',
        certificate: ''
      }];
      this.nbrFormation = this.newComponentProfile.getnbr().formation;
      this.nbrsFormations = Array(this.nbrFormation).fill(4);
      this.newComponentProfile.setnbrFomration(this.nbrFormation);
      this.isLoaded = true;
    }

    /*if (this.datas != null) {
      let index: number = 0;
      while (index < this.nbrFormation) {
        this.datas.push(null);
        console.log(this.datas[index]);
        console.log("index of : " + index)
        index++;
      }
    } else {
      console.log("datas is null probleme");
    }
    console.log("the lenght of datas is " + this.datas.length);*/
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    if (!this.isLoaded) {
      setTimeout(() => {
        console.log(this.FormationsArray);
      }, 1000);
    }

  }
  // tslint:disable-next-line:use-lifecycle-interface
  /* ngDoCheck(): void {
     console.log(this.nbrsFormations.length);
   }*/
  pass(i: number) {
    console.log('number: ' + i);
    this.curren = i;
  }
  public newFormation() {
    this.step++;
    console.log('new Formation');
    this.nbrFormation = this.newComponentProfile.addFormation();
    this.nbrsFormations = Array(this.nbrFormation).fill(4);
    this.FormationsArray.push({
      formation: '',
      establishement: '',
      yearsBegun: '',
      mounthsBegun: '',
      yearsLast: '',
      mounthsLast: '',
      certificate: ''
    });
    this.Formations.push({
      formation: '',
      establishement: '',
      yearsBegun: '',
      mounthsBegun: '',
      yearsLast: '',
      mounthsLast: ''
    });
    console.log('Formation: ' + this.nbrFormation);
    /*if (this.datas != null) {
      this.datas[this.Lenght(this.datas)] = null;
      console.log("the lenght of datas is " + this.Lenght(this.datas));
    } else {
      console.log("prooooooooooobleeeeeeem datas is null");
    }*/

  }
  public deleteFormation(i: number) {
    console.log('------deleting----------');
    console.log('delete Formation index of ' + i);
    this.nbrFormation = this.newComponentProfile.deleteFormation();
    this.nbrsFormations = Array(this.nbrFormation).fill(4);

    this.Formations.splice(i, 1);
    this.FormationsArray.splice(i, 1);

    console.log('Formation: ' + this.nbrFormation);
    this.datas[this.nbrFormation as number] = undefined;
    this.nameDatas[this.nbrFormation as number] = undefined;
    /*if (this.datas != null) {
      this.datas[this.Lenght(this.datas) - 1] = undefined;
      console.log("the lenght of datas is " + this.Lenght(this.datas));
    } else {
      console.log("prooooooooooobleeeeeeem datas is null");
    }*/
  }

  public Submite(form: NgForm) {
    console.log('------------Formation---------------');
    console.log('formation: ' + this.formation.formation);
    let index = 0;
    while (index < this.Formations.length) {
      console.log('index of formation' + index);
      console.log(this.Formations[index].formation);
      index++;
    }

    // this.profileHttp.addFormation(form, this.nameDatas, this.datas, this.nbrFormation as number);
  }
  SubmiteSimple() {
    console.log('---------submiteFormation--------------');
    let index = 0;
    while (index < this.FormationsArray.length) {
      this.Formations[index].formation = this.FormationsArray[index].formation;
      this.Formations[index].establishement = this.FormationsArray[index].establishement;
      this.Formations[index].mounthsBegun = this.FormationsArray[index].mounthsBegun;
      this.Formations[index].mounthsLast = this.FormationsArray[index].mounthsLast;
      this.Formations[index].yearsBegun = this.FormationsArray[index].yearsBegun;
      this.Formations[index].yearsLast = this.FormationsArray[index].yearsLast;
      index++;
    }
    this.profileHttp.addFormation(this.Formations, this.nameDatas, this.datas, this.nbrFormation as number);

  }

  setFile(event, name: NgModel) {
    console.log('the name of inptu is ' + name.name);
    console.log(event);
    const trg: HTMLInputElement = event.target;
    console.log('target event: ' + trg);
    this.file = trg.files[0];
    console.log('image: ' + this.file);
    console.log('image name' + this.file.name);

    // let index:number=name.name;
    const data: FormData = new FormData();
    data.append('image', this.file, this.file.name);
    this.GeneraleData.append('image', this.file, this.file.name);
    this.datas[name.name] = data;
    console.log('data is: ');
    console.log(data);
    console.log('data int the list is: ');
    console.log(this.datas[+name.name]);
    /* this.datas[5] = new FormData();
     console.log(this.datas[5]);*/

    // for testing


    /*let index: number = 0;
    while (index < 10) {
      console.log("index is " + index);
      console.log(this.datas[index]);
      index++;
    }*/

  }

  SetFile(event, i: number) {
    console.log('!!!!!!!!!!!!!!!!!!!!' + i);
    const trg: HTMLInputElement = event.target;
    this.file = trg.files[0];
    console.log('image: ' + this.file);
    console.log('image name' + this.file.name);
    const data: FormData = new FormData();
    data.append('image', this.file, this.file.name);
    this.datas[i] = data;
    this.nameDatas[i] = this.file.name;
    let index = 0;
    while (index < 10) {
      console.log('index is ' + index);
      console.log(this.datas[index]);
      console.log(this.nameDatas[index]);
      index++;
    }


  }



  ChangeInput(i: number, event) {
    console.log(i);
    console.log('value of event ' + event.target.value);
    console.log('name of event: ' + event.target.name);
    if (event.target.name === 'formation') {
      this.Formations[i].formation = event.target.value;
    } else if (event.target.name === 'establishement') {
      this.Formations[i].establishement = event.target.value;
    } else if (event.target.name === 'yearsBegun') {
      this.Formations[i].yearsBegun = event.target.value;
    } else if (event.target.name === 'yearsLast') {
      this.Formations[i].yearsLast = event.target.value;
    } else if (event.target.name === 'mounthsBegun') {
      this.Formations[i].mounthsBegun = event.target.value;
    } else if (event.target.name === 'mounthsLast') {
      this.Formations[i].mounthsLast = event.target.value;
    }

    let index = 0;
    console.log('----begun fetching');
    while (index < this.Formations.length) {
      console.log('index of formation:' + index);
      console.log('value: ' + this.Formations[index].formation);
      console.log('index of establishement:' + index);
      console.log('value: ' + this.Formations[index].establishement);
      console.log('index of yearsBegun:' + index);
      console.log('value: ' + this.Formations[index].yearsBegun);
      console.log('index of yearsEnd:' + index);
      console.log('value: ' + this.Formations[index].yearsLast);
      console.log('index of mouthsbegun:' + index);
      console.log('value: ' + this.Formations[index].mounthsBegun);
      console.log('index of mounthsLast:' + index);
      console.log('value: ' + this.Formations[index].mounthsLast);
      index++;
    }
    console.log('----end fetching------');


  }


  setStep(index: number) {
    this.step = index;
    console.log(this.step + ' !!! formations');
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // this.managementProfile.SetKleUpdateCv(false);

  }

  /* Lenght(List: FormData[]): number {
     let index: number = 0;
     while (true) {
       if (List[index] == undefined) {
         return index;
       }
       index++;
     }
   }*/

}
