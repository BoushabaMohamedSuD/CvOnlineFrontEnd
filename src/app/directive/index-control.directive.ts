import { Directive, Renderer2, ElementRef } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Directive({
  selector: '[appIndexControl]'
})
export class IndexControlDirective {

  constructor(private render: Renderer2, private elrf: ElementRef) {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.render.setStyle(this.elrf.nativeElement, 'background-color', 'red');

  }

}
