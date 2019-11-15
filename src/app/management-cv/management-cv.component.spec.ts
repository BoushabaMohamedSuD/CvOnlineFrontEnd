import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCvComponent } from './management-cv.component';

describe('ManagementCvComponent', () => {
  let component: ManagementCvComponent;
  let fixture: ComponentFixture<ManagementCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
