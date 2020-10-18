import { ManagementMakeProfile } from './../Service/ManagementProfile';
import { Component, OnInit, ElementRef } from '@angular/core';
declare var jsPDF: any;

// keep it in this way to fix no compatible signature
//instead of this  import * as html2canvas from 'html2canvas';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  private isconnected: boolean;
  public lists = [1, 2, 3];
  constructor(private managementprofile: ManagementMakeProfile) {
    this.isconnected = false;
  }

  ngOnInit() {
    this.managementprofile.SetKleUpdateCv(false);
    this.managementprofile.SetDrawerKey(false);
    this.CheckConnection();
  }
  CheckConnection() {
    let token: string;
    token = localStorage.getItem('token');
    if (token == null) {
      this.isconnected = false;
    } else {
      this.isconnected = true;
    }
  }
  onpdf(test: HTMLInputElement) {
    const data = document.getElementById('test12');

    html2canvas(test, {
      width: 790.619485,
      height: 1118.153874,
      x: 0,
      y: 445,

    }).then((canvas) => {
      console.log(canvas.toDataURL('image/png'));
      document.body.appendChild(canvas);
      // window.open(canvas);
      console.log('hi');
      console.log(data.offsetTop);
      console.log(data.clientTop);
      console.log(data.scrollTop);
      console.log(data.getBoundingClientRect());
      console.log(':::test:::::');
      console.log(test.offsetTop);
      console.log(test.clientTop);
      console.log(test.scrollTop);
      console.log(test.getBoundingClientRect());
      console.log(':::pdf:::::');
      const pdf = new jsPDF('p', 'pt', 'a4'); // A4 size page of PDF
      const position = 0;
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      console.log(width + ' dd ' + height);
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, width, height);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });

  }
  onPdf() {
    console.log(':::::::Converting to PDF:::::::');

    const data = document.getElementById('Main');
    html2canvas(data, {
      allowTaint: false,
      /* windowWidth: data.scrollWidth,
       windowHeight: data.scrollHeight*/
    }).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      //  const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgHeight = 600;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      console.log(contentDataURL);
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position);
      pdf.save('MYPdf.pdf'); // Generated PDF
    }).catch(() => console.log('error making pdf'));

  }
}
