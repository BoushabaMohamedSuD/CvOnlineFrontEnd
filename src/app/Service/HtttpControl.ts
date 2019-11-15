import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export class HttpControl {
  constructor(private http: HttpClient) {

  }


  SubmiteLogin(userLogin: { username: string, password: string }) {
    return this.http.post('http://localhost:5236/Maven/login', userLogin, { observe: 'response' });

  }
  SubmiteRegistre(userRegistre: { username: string, password: string, email: string, confirm_password: string }) {
    // let headers2: Headers = new Headers({ 'Authorization': 'Bearer ' + token });
    console.log(userRegistre);
    return this.http.post('http://localhost:5236/Maven/registre', userRegistre, { observe: 'response' });
  }
  SubmitePersonalInfo(formData: FormData) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const headers: Headers = new Headers({ Authorization: 'Bearer ' + token });
      // we need to define the link from backend
      return this.http.post('http://localhost:5236/Maven/isConnectedjwt', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }


  }

  AddTitle(CvTitle: { title: string }, Username: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string);

      // we need to define the link from backend

      return this.http.post('http://localhost:5236/Maven/CreateNewCv', CvTitle, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }

  }
  updateTile(CvTitles: [{ title: string }], Username: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string);

      // we need to define the link from backend

      return this.http.post('http://localhost:5236/Maven/UpdateCv', CvTitles, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }




  }
  DeleteCv(CvTitle: { title: string }, Username: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string);

      // we need to define the link from backend

      return this.http.post('http://localhost:5236/Maven/DeleteCv', CvTitle, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }
  showCv(Username: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string);

      // we need to define the link from backend

      return this.http.get('http://localhost:5236/Maven/ShowCv', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }

  // tslint:disable-next-line:max-line-length
  addInfoPersonal(CvTitle: string, Username: string, info: { firstname: string, lastname: string, email: string, adress: string, nbrtele: string, image: string }) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);

      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/CreateNewInfoPersonal', info, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }
  addImage(CvTitle: string, Username: string, FileName: string, imageFormData: FormData, Reposotry: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', localStorage.getItem('CvId') as string)
        .append('FileName', FileName as string)
        .append('TypeProfile', Reposotry as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/UploadImage', imageFormData, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }

  }
  addFormations(Formtaions: {
    formation: string,
    establishement: string,
    yearsBegun: string,
    mounthsBegun: string,
    yearsLast: string,
    mounthsLast: string,
    certificate: string;
    // tslint:disable-next-line:align
  }[], Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/CreateNewFormation', Formtaions, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }

  }
  addFiles(CvTitle: string, Username: string, FileName: string[], imageFormData: FormData[]) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {

      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string)
        .append('FileName', 'test.png')
        .append('NbrHeaders', '1')
        .append('TypeProfile', 'formation');

      // .append('FileName', FileName as string)
      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/UploadImage', imageFormData, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }

  }

  addCompetence(Competences: [{
    competence: string,
    level: string

    // tslint:disable-next-line:align
  }], Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/CreateNewCompetence', Competences, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }


  }
  addLanguage(Languages: [{
    language: string,
    level: string

    // tslint:disable-next-line:align
  }], Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/CreateNewLanguage', Languages, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }


  }
  addLeisure(Languages: [{
    leisur: string

  }],
    // tslint:disable-next-line:align
    Username: string,
    // tslint:disable-next-line:align
    CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.post('http://localhost:5236/Maven/CreateNewLeisure', Languages, { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }


  }
  getFormation(Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.get('http://localhost:5236/Maven/ShowFormation', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }
  getPersonaleInfo(Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.get('http://localhost:5236/Maven/ShowInfoPersonal', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }
  getCompetence(Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.get('http://localhost:5236/Maven/ShowCompetence', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }
  getLeisure(Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.get('http://localhost:5236/Maven/ShowLeisure', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }
  getLanguage(Username: string, CvTitle: string) {
    let token: string;
    token = localStorage.getItem('token');
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', CvTitle as string);


      // we need to define the link from backend
      console.log('sending Ifon to backend');
      return this.http.get('http://localhost:5236/Maven/ShowLanguage', { headers, observe: 'response' });
    } else {
      console.log('you are not connected');
    }
  }


  getimage() {
    let token: string;
    token = localStorage.getItem('token');
    const Username: string = localStorage.getItem('Username');
    const Cvtitle: string = localStorage.getItem('CvId');
    console.log(Cvtitle + ' : ' + Username);
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', Cvtitle as string);



      // we need to define the link from backend
      console.log('sending Ifon to backend');
      // tslint:disable-next-line:max-line-length
      return this.http.get('http://localhost:5236/Maven/Getimage/infoPersonel/InfoPersonal', { headers, responseType: 'blob', observe: 'response' });
    } else {
      console.log('you are not connected');
    }

  }
  getimageByid(cvId: number) {
    let token: string;
    token = localStorage.getItem('token');
    const Username: string = localStorage.getItem('Username');
    const Cvtitle = '' + cvId;
    console.log(Cvtitle + ' : ' + Username);
    if (token != null) {
      const xheaders = new HttpHeaders();
      const headers = xheaders.append('Content-Type', 'application/json')
        .append('Authorization', token as string)
        .append('UserName', Username as string)
        .append('CvTitle', Cvtitle as string);



      // we need to define the link from backend
      console.log('sending Ifon to backend byId');
      // tslint:disable-next-line:max-line-length
      return this.http.get('http://localhost:5236/Maven/Getimage/infoPersonel/InfoPersonal', { headers, responseType: 'blob', observe: 'response' });
    } else {
      console.log('you are not connected');
    }

  }


}

