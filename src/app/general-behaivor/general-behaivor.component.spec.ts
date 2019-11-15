import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBehaivorComponent } from './general-behaivor.component';

describe('GeneralBehaivorComponent', () => {
  let component: GeneralBehaivorComponent;
  let fixture: ComponentFixture<GeneralBehaivorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralBehaivorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBehaivorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
