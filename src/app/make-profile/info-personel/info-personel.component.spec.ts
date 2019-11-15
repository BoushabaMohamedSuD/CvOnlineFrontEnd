import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonelComponent } from './info-personel.component';

describe('InfoPersonelComponent', () => {
  let component: InfoPersonelComponent;
  let fixture: ComponentFixture<InfoPersonelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
