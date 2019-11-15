import { Component } from '@angular/core';
export class NewComponentProfile {
    private nbr: { formation: number, competence: number, language: number, leisure: number, project: number };
    constructor() {
        this.nbr = { formation: 1, competence: 1, language: 1, leisure: 1, project: 1 };
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit(): void {


    }
    setnbrFomration(nbr: number) {
        this.nbr.formation = nbr;
    }
    setnbrCompetence(nbr: number) {
        this.nbr.competence = nbr;
    }
    setnbrLanguague(nbr: number) {
        this.nbr.language = nbr;
    }
    setnbrLeisure(nbr: number) {
        this.nbr.leisure = nbr;
    }

    addFormation(): number {
        this.nbr.formation++;
        return this.nbr.formation;
    }
    addCompetence(): number {
        this.nbr.competence++;
        return this.nbr.competence;
    }
    addLanguage(): number {
        this.nbr.language++;
        return this.nbr.language;
    }
    addLeisure(): number {
        this.nbr.leisure++;
        return this.nbr.leisure;
    }
    addProject(): number {
        this.nbr.project++;
        return this.nbr.project;
    }


    deleteFormation(): number {
        this.nbr.formation--;
        return this.nbr.formation;
    }
    deleteCompetence(): number {
        this.nbr.competence--;
        return this.nbr.competence;
    }
    deleteLanguage(): number {
        this.nbr.language--;
        return this.nbr.language;
    }
    deleteLeisure(): number {
        this.nbr.leisure--;
        return this.nbr.leisure;
    }
    deleteProject(): number {
        this.nbr.project--;
        return this.nbr.project;
    }



    public getnbr(): { formation: number, competence: number, language: number, leisure: number, project: number } {
        return this.nbr;
    }

}
