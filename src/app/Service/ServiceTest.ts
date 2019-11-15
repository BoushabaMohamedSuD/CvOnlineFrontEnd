import { Injectable } from '@angular/core';
import { ServiceTestInjectable } from './ServiceTestInjectable';

@Injectable()
export class ServiceTest {
  constructor(private sti: ServiceTestInjectable) { }
  DebugTest(name: String) {
    console.log("this is a service test from ServiceTest.ts to " + name);
    this.sti.DebugTest();

  }
}
