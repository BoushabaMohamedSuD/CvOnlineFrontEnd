import { Component, OnInit } from '@angular/core';
import { NewComponentProfile } from 'src/app/Service/NewComponentProfile';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  private nbrProject: Number;
  public nbrsProjects: Array<Number>;
  public curren: Number;
  constructor(private newComponentProfile: NewComponentProfile) {
    this.nbrProject = 1;
    this.nbrsProjects = Array(this.nbrProject).fill(4);
    this.curren = 0;
  }

  ngOnInit() {
    this.nbrProject = this.newComponentProfile.getnbr().project;
    this.nbrsProjects = Array(this.nbrProject).fill(4);
  }
  ngDoCheck(): void {

  }
  pass(i: Number) {
    console.log("Number: " + i);
    this.curren = i;
  }
  public newFormation() {
    console.log("new Formation");
    this.nbrProject = this.newComponentProfile.addProject();
    this.nbrsProjects = Array(this.nbrProject).fill(4);
    console.log("Formation: " + this.nbrProject);
  }
  public deleteFormation() {
    console.log("delete Formation");
    this.nbrProject = this.newComponentProfile.deleteProject();
    this.nbrsProjects = Array(this.nbrProject).fill(4);
    console.log("Formation: " + this.nbrProject);
  }

}
