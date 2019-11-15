import { Injectable } from '@angular/core';
import { HttpControl } from './HtttpControl';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { HttpService } from './HttpServiceTest';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Observer, Subscription } from 'rxjs';
import { ManagementMakeProfile } from './ManagementProfile';
import { Promise } from 'q';


@Injectable()
export class ProfileHttp {
    private MySubscription: Subscription;
    public image: Blob;
    public mysrc: string;
    private counter = 0;
    private CvTitles: [{ title: string }];
    private CvTitle: { title: string };
    private InfoPersonal: {
        firstname: string,
        lastname: string,
        email: string,
        adress: string,
        nbrtele: string,
        image: string
    };
    private FileDeta: FormData[];
    private UserName: string;
    private Title: string;
    private Formations: [{
        formation: string,
        establishement: string,
        yearsBegun: string,
        mounthsBegun: string,
        yearsLast: string,
        mounthsLast: string,
        certificate: string;
    }];
    private formation: {
        formation: string,
        establishement: string,
        yearsBegun: string,
        mounthsBegun: string,
        yearsLast: string,
        mounthsLast: string,
        certificate: string
    };
    private kleFormation = false;
    private kleCompetence = false;
    private KleLanguage = false;
    private KleLeisure = false;

    constructor(private httpControle: HttpControl, private mngProfile: ManagementMakeProfile) {
        this.InfoPersonal = { firstname: '', lastname: '', email: '', adress: '', nbrtele: '', image: '' };
        this.Formations = [{
            formation: '',
            establishement: '',
            yearsBegun: '',
            mounthsBegun: '',
            yearsLast: '',
            mounthsLast: '',
            certificate: ''
        }];
        this.formation = {
            formation: '',
            establishement: '',
            yearsBegun: '',
            mounthsBegun: '',
            yearsLast: '',
            mounthsLast: '',
            certificate: ''
        };
    }

    addTtile(CvTitle: { title: string }) {
        this.CvTitle = CvTitle;
        this.UserName = localStorage.getItem('Username');
        this.httpControle.AddTitle(CvTitle, this.UserName).subscribe(
            (resp) => {
                console.log('Responde ' + resp);
                localStorage.setItem('CvId', resp.headers.get('CvId'));
            },
            (error) => console.log(error),
            () => {
                console.log('title has been saved: ' + this.CvTitle.title);
                localStorage.setItem('CvTitle', this.CvTitle.title as string);
            }


        );
    }
    updateTitle(CvTitle: { title: string }) {
        this.CvTitles = [{ title: localStorage.getItem('CvTitle') }];
        this.CvTitle = CvTitle;
        this.CvTitles.push(this.CvTitle);
        this.UserName = localStorage.getItem('Username');
        this.httpControle.updateTile(this.CvTitles, this.UserName).subscribe(
            (resp) => {
                console.log('Responde ' + resp);
                console.log(resp.headers.get('CvId'));
                localStorage.setItem('CvId', resp.headers.get('CvId'));
                window.location.reload();
            },
            (error) => console.log(error),
            () => {
                console.log('title has been saved');
                localStorage.setItem('CvTitle', this.CvTitle.title as string);
            }
        );

    }
    deleteCv(CvTitle: { title: string }) {
        this.CvTitles = [{ title: localStorage.getItem('CvTitle') }];
        this.UserName = localStorage.getItem('Username');
        this.httpControle.DeleteCv(this.CvTitles[0], this.UserName).subscribe(
            (resp) => {
                console.log('Responde ' + resp);
                localStorage.removeItem('CvId');
                window.location.reload();
            },
            (error) => console.log(error),
            () => {
                console.log('title has been saved: ' + this.CvTitle.title);
                localStorage.setItem('CvTitle', this.CvTitle.title as string);
            }


        );

    }
    showCv() {
        this.UserName = localStorage.getItem('Username');
        const kle = false;
        this.httpControle.showCv(this.UserName).subscribe(
            (resp) => {
                this.CvTitles = resp.body as [{ title: string }];
                console.log('get all cv from the user');
            },
            (error) => { },
            () => { }
        );

    }
    GetCvs(): [{ title: string }] {
        return this.CvTitles;
    }
    addInfoPersonal(form: NgForm, imageName: string, imageFormData: FormData) {
        this.counter = 0;
        this.FileDeta = null;
        if (this.InfoPersonal != null) {
            this.InfoPersonal.firstname = form.value.firstname;
            console.log(this.InfoPersonal.firstname + ' firstname');
            this.InfoPersonal.lastname = form.value.lastname;
            console.log(this.InfoPersonal.lastname + ' lastname');
            this.InfoPersonal.email = form.value.email;
            this.InfoPersonal.adress = form.value.adress;
            this.InfoPersonal.image = imageName;
            console.log(this.InfoPersonal.image + ' image');
            this.InfoPersonal.nbrtele = form.value.number;
            const Username: string = localStorage.getItem('Username');
            const Cvtitle: string = localStorage.getItem('CvTitle');
            console.log('begun adding info');
            this.httpControle.addInfoPersonal(Cvtitle, Username, this.InfoPersonal).subscribe(
                (resp) => {

                },
                (erro) => { console.log(erro); },
                () => {
                    console.log('end dending info');
                    console.log('begun uploiding image');
                    this.addImage(imageFormData);
                }
            );
        } else {
            console.log('info personal is null');
        }
    }
    addImage(imageFormData: FormData) {
        const propreCounter = this.counter;
        console.log('UploadImage');
        const Username: string = localStorage.getItem('Username');
        const Cvtitle: string = localStorage.getItem('CvTitle');
        let Filename = 'InfoPersonal.png';
        let Reposotry = 'infoPersonel';
        if (this.FileDeta != null) {
            if (this.kleFormation) {
                Filename = 'Formation_' + this.counter + '.png';
                Reposotry = 'formation';
            } else if (this.kleCompetence) {
                Filename = 'Competence_' + this.counter + '.png';
                Reposotry = 'competence';
            } else if (this.KleLanguage) {
                Filename = 'Language_' + this.counter + '.png';
                Reposotry = 'formation';
            } else if (this.KleLeisure) {
                Filename = 'Leisure_' + this.counter + '.png';
                Reposotry = 'leisure';
            } else {
                console.log('eroooooooor!!!!!!!!!!!');
                return;
            }

        }
        if (imageFormData != null && imageFormData !== undefined) {
            console.log('data is not undefined ' + this.counter);
            this.httpControle.addImage(Cvtitle, Username, Filename, imageFormData, Reposotry).subscribe(
                (resp) => {
                    console.log(resp);
                },
                (error) => { console.log(error); },
                () => {
                    if (this.FileDeta != null) {
                        this.counter++;
                        if (this.counter < this.FileDeta.length) {
                            this.addImage(this.FileDeta[this.counter]);
                        } else {
                            console.log('Uplaod Done');
                        }

                    } else {
                        console.log('upload done');
                    }

                }
            );
        } else {
            console.log('data is undefined ' + this.counter);
            this.counter++;
            if (this.counter < this.FileDeta.length) {
                this.addImage(this.FileDeta[this.counter]);
            } else {
                console.log('Uplaod Done');
            }
        }



    }
    addFormation(formInfo: [{
        formation: string,
        establishement: string,
        yearsBegun: string,
        mounthsBegun: string,
        yearsLast: string,
        mounthsLast: string
        // tslint:disable-next-line:align
    }], imageFiles: string[], fileDatas: FormData[], lenght: number) {
        this.kleFormation = true;
        this.kleCompetence = false;
        this.KleLanguage = false;
        this.KleLeisure = false;
        this.FileDeta = fileDatas;
        this.counter = 0;
        const Username: string = localStorage.getItem('Username');
        const Cvtitle: string = localStorage.getItem('CvTitle');
        this.Formations = [{
            formation: '',
            establishement: '',
            yearsBegun: '',
            mounthsBegun: '',
            yearsLast: '',
            mounthsLast: '',
            certificate: ''
        }];
        this.FileDeta = fileDatas;
        this.counter = 0;
        let index = 0;
        console.log('begun verefication of input');
        while (index < formInfo.length) {
            console.log('formation: ' + formInfo[index].formation);
            console.log('NameFile: ' + imageFiles[index]);
            index++;
        }
        index = 0;
        console.log('end verification of input');
        while (index < formInfo.length) {
            const elementFormation: {
                formation: string,
                establishement: string,
                yearsBegun: string,
                mounthsBegun: string,
                yearsLast: string,
                mounthsLast: string,
                certificate: string;
            } = {
                formation: formInfo[index].formation,
                establishement: formInfo[index].establishement,
                yearsBegun: formInfo[index].yearsBegun,
                mounthsBegun: formInfo[index].mounthsBegun,
                yearsLast: formInfo[index].yearsLast,
                mounthsLast: formInfo[index].mounthsLast,
                certificate: imageFiles[index]
            };
            if (index === 0) {
                this.Formations[index].formation = elementFormation.formation;
                this.Formations[index].establishement = elementFormation.establishement;
                this.Formations[index].yearsBegun = elementFormation.yearsBegun;
                this.Formations[index].yearsLast = elementFormation.yearsLast;
                this.Formations[index].mounthsBegun = elementFormation.mounthsBegun;
                this.Formations[index].mounthsLast = elementFormation.mounthsLast;
                this.Formations[index].certificate = elementFormation.certificate;
            } else {
                this.Formations.push(elementFormation);

            }
            console.log('index: ' + index);
            console.log('Formation: ' + this.Formations[index].formation);
            console.log('certificate: ' + this.Formations[index].certificate);
            index++;
        }
        console.log('lenght of Formation is: ' + this.Formations.length);
        console.log('begun verification of output');
        index = 0;
        while (index < this.Formations.length) {
            console.log('index: ' + index);
            console.log('formation: ' + this.Formations[index].formation);
            console.log('FileName: ' + this.Formations[index].certificate);
            index++;
        }
        console.log('end verification of output');
        this.httpControle.addFormations(this.Formations, Username, Cvtitle).subscribe(
            (resp) => { },
            (error) => {
                console.log('Error !!!!!!!!!');
                console.log(error);
            },
            () => {
                console.log('info has been sended');
                // this.addFiles(fileDatas, imageFiles);
                if (this.counter < this.Formations.length) {
                    if (fileDatas[this.counter] !== undefined && this.formation[this.counter] !== undefined) {
                        console.log('ecryting is ok');
                    } else {
                        console.log(this.counter + ' data is undefined');
                    }
                    this.addImage(fileDatas[this.counter]);
                } else {
                    console.log('Uplaod Done');
                }

                // this.addImage(GeneralFormData);

            }
        );

    }
    addFiles(data: FormData[], imageFiles: string[]) {
        console.log('UploadFiles');
        const Username: string = localStorage.getItem('Username');
        const Cvtitle: string = localStorage.getItem('CvTitle');
        this.httpControle.addFiles(Cvtitle, Username, imageFiles, data).subscribe(
            (resp) => {
                console.log(resp);
            },
            (error) => { console.log(error); },
            () => {
                console.log('Uploading Files Done');
            }
        );

    }
    addCompetence(Competences: [{
        competence: string,
        level: string

    }]) {
        this.kleFormation = false;
        this.kleCompetence = true;
        this.KleLanguage = false;
        this.KleLeisure = false;
        this.FileDeta = null;
        this.counter = 0;
        const Username: string = localStorage.getItem('Username');
        const Cvtitle: string = localStorage.getItem('CvTitle');
        this.httpControle.addCompetence(Competences, Username, Cvtitle).subscribe(
            (resp) => { console.log(resp); },
            (error) => { console.log(error); },
            () => { console.log('uplaod Competence Done'); }
        );
    }
    addLanguage(Languages: [{
        language: string,
        level: string

    }]) {
        this.kleFormation = false;
        this.kleCompetence = false;
        this.KleLanguage = true;
        this.KleLeisure = false;
        this.FileDeta = null;
        this.counter = 0;
        const Username: string = localStorage.getItem('Username');
        const Cvtitle: string = localStorage.getItem('CvTitle');
        this.httpControle.addLanguage(Languages, Username, Cvtitle).subscribe(
            (resp) => { console.log(resp); },
            (error) => { console.log(error); },
            () => { console.log('uplaod Language Done'); }
        );
    }
    addLeisure(Leisure: [{
        leisur: string

    }]) {
        this.kleFormation = false;
        this.kleCompetence = false;
        this.KleLanguage = false;
        this.KleLeisure = true;
        this.FileDeta = null;
        this.counter = 0;
        const Username: string = localStorage.getItem('Username');
        const Cvtitle: string = localStorage.getItem('CvTitle');
        this.httpControle.addLeisure(Leisure, Username, Cvtitle).subscribe(
            (resp) => { console.log(resp); },
            (error) => { console.log(error); },
            () => { console.log('uplaod Language Done'); }
        );
    }

    showPersonalInfo(): Promise<any> {
        console.log('::::::::show PersonaleInfo:::::::::::');
        const Username = localStorage.getItem('Username');
        const CvTitle = localStorage.getItem('CvTitle');
        return Promise<any>((res, rej) => {
            this.httpControle.getPersonaleInfo(Username, CvTitle).subscribe(
                (resp) => {
                    console.log('::::::::resp PersonaleInfo:::::::::::');
                    // console.log(resp.body);
                    if (resp.body == null) {
                        console.log('PersonalInfo is empty');
                    }
                    res(resp.body);
                    // tslint:disable-next-line:prefer-const


                },
                (err) => {
                    console.log(err);
                    rej(null);
                },
                () => {
                    console.log('operation done');
                }
            );
        });
    }
    showFormation(): Promise<any> {
        console.log('::::::::show Formation:::::::::::');
        const Username = localStorage.getItem('Username');
        const CvTitle = localStorage.getItem('CvTitle');
        return Promise<any>((res, rej) => {
            this.httpControle.getFormation(Username, CvTitle).subscribe(
                (resp) => {
                    console.log('::::::::resp Formation:::::::::::');
                    // console.log(resp.body);
                    if (resp.body == null) {
                        console.log('Formation is empty');
                    }
                    res(resp.body);
                    // tslint:disable-next-line:prefer-const


                },
                (err) => {
                    console.log(err);
                    rej(null);
                },
                () => {
                    console.log('operation done');
                }
            );
        });
    }
    showCompetence(): Promise<any> {
        console.log('::::::::show Competence:::::::::::');
        const Username = localStorage.getItem('Username');
        const CvTitle = localStorage.getItem('CvTitle');
        return Promise<any>((res, rej) => {
            this.httpControle.getCompetence(Username, CvTitle).subscribe(
                (resp) => {
                    console.log('::::::::resp :::::::::Competence::');
                    console.log(resp.body);
                    if (resp.body == null) {
                        console.log('competence is empty');
                    }
                    res(resp.body);
                    // tslint:disable-next-line:prefer-const


                },
                (err) => {
                    console.log(err);
                    rej(null);
                },
                () => {
                    console.log('operation done');
                }
            );
        });
    }
    showLanguague(): Promise<any> {
        console.log('::::::::show Language:::::::::::');
        const Username = localStorage.getItem('Username');
        const CvTitle = localStorage.getItem('CvTitle');
        return Promise<any>((res, rej) => {
            this.httpControle.getLanguage(Username, CvTitle).subscribe(
                (resp) => {
                    console.log('::::::::resp Languague:::::::::::');
                    // console.log(resp.body);
                    if (resp.body == null) {
                        console.log('Language is empty');
                    }
                    res(resp.body);
                    // tslint:disable-next-line:prefer-const


                },
                (err) => {
                    console.log(err);
                    rej(null);
                },
                () => {
                    console.log('operation done');
                }
            );
        });
    }
    showLeisure(): Promise<any> {
        console.log('::::::::show Leisure:::::::::::');
        const Username = localStorage.getItem('Username');
        const CvTitle = localStorage.getItem('CvTitle');
        return Promise<any>((res, rej) => {
            this.httpControle.getLeisure(Username, CvTitle).subscribe(
                (resp) => {
                    console.log('::::::::resp Leisure:::::::::::');
                    // console.log(resp.body);
                    if (resp.body == null) {
                        console.log('Leisure is empty');
                    }
                    res(resp.body);
                    // tslint:disable-next-line:prefer-const


                },
                (err) => {
                    console.log(err);
                    rej(null);
                },
                () => {
                    console.log('operation done');
                }
            );
        });
    }

    getimage(): Promise<string> {
        console.log('---------------------------getting image-------------------------');
        return Promise<any>((res, rej) => {
            this.httpControle.getimage().subscribe(
                (resp) => {
                    console.log(resp);
                    this.image = resp.body;
                    console.log(this.image);
                },
                (error) => {
                    console.log('error');
                    if (error != null) {
                        console.log(error);
                        console.log(error.error);
                    }

                },
                () => {

                    const MyObservale = new Observable((observer: Observer<string>) => {
                        console.log('-----------begun suvscription----------');
                        const reader = new FileReader();
                        reader.readAsDataURL(this.image);
                        reader.onloadend = () => {
                            observer.next(reader.result as string);
                            observer.complete();
                        };


                    });
                    this.MySubscription = MyObservale.subscribe(
                        (mysrc: string) => {
                            console.log('we got the src of image');
                            this.mysrc = mysrc;
                            res(this.mysrc);

                        },
                        () => {
                            console.log('eroor');
                            rej('');
                            this.MySubscription.unsubscribe();

                        },
                        () => {
                            console.log('Operation done');
                            this.mngProfile.SetUrlImagePush({ url: this.mysrc });
                            this.MySubscription.unsubscribe();


                        }
                    );
                    console.log('getting Image Done');

                }
            );

        });



    }
    getimageById(cvId: number, index: number): Promise<any> {
        console.log('---------------------------getting image-------------------------');
        return Promise<any>((res, rej) => {
            this.httpControle.getimageByid(cvId).subscribe(
                (resp) => {
                    console.log(resp);
                    this.image = resp.body;
                    console.log(this.image);
                },
                (error) => {
                    console.log('error');
                    if (error != null) {
                        console.log(error);
                        console.log(error.error);
                    }

                },
                () => {

                    const MyObservale = new Observable((observer: Observer<string>) => {
                        console.log('-----------begun suvscription----------');
                        const reader = new FileReader();
                        reader.readAsDataURL(this.image);
                        reader.onloadend = () => {
                            observer.next(reader.result as string);
                            observer.complete();
                        };


                    });
                    this.MySubscription = MyObservale.subscribe(
                        (mysrc: string) => {
                            console.log('we got the src of image');
                            this.mysrc = mysrc;
                            const image: { src: string, position: number } = { src: this.mysrc, position: index };
                            res(image);

                        },
                        () => {
                            console.log('eroor');
                            rej('');
                            this.MySubscription.unsubscribe();

                        },
                        () => {
                            console.log('Operation done');
                            this.mngProfile.SetUrlImagePush({ url: this.mysrc });
                            this.MySubscription.unsubscribe();


                        }
                    );
                    console.log('getting Image Done');

                }
            );

        });



    }
}
