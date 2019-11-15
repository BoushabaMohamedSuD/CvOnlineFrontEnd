import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuikLookComponent } from './quik-look.component';

describe('QuikLookComponent', () => {
  let component: QuikLookComponent;
  let fixture: ComponentFixture<QuikLookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuikLookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuikLookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
