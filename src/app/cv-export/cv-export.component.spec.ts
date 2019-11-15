import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvExportComponent } from './cv-export.component';

describe('CvExportComponent', () => {
  let component: CvExportComponent;
  let fixture: ComponentFixture<CvExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
