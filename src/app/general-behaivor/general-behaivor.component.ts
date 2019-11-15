import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ServiceTest } from '../Service/ServiceTest';


/*
export interface IComponent {
  selector: string;
  template?: string;
  templateUrl?: string;
  styles?: string[];
  styleUrls?: string[];
  directives?: any;
  providers?: any;
  encapsulation?: number;
}

export function CustomComponent( properties: IComponent): Function {
  let aditionalStyles: string;

  try {
      aditionalStyles =  require(`path to aditional styles/${ properties.selector }/style/${        properties.selector }.${ GAME }.scss`);
      properties.styles.push(aditionalStyles);
    } catch (err) {
      console.warn(err);
    }
  }

  return Component( properties );
}*/



/*let Url = './general1-behaivor.component.css';
function changeStyleUrl(rl: string): string {
  Url = rl;
  console.log(Url);
  return Url;
}*/
@Component({
  selector: 'app-general-behaivor',
  templateUrl: './general-behaivor.component.html',
  styleUrls: ['./general1-behaivor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GeneralBehaivorComponent implements OnInit {
  @Input() public setCssGeneral;

  constructor() {
    console.log(this.setCssGeneral);

  }
  onChangeStyle() {
    console.log(this.setCssGeneral);

  }

  ngOnInit() {
    console.log(this.setCssGeneral);
  }

  ngDoCheck(): void {



  }

}
