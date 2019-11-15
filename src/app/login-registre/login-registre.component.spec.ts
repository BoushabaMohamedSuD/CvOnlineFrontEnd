import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistreComponent } from './login-registre.component';

describe('LoginRegistreComponent', () => {
  let component: LoginRegistreComponent;
  let fixture: ComponentFixture<LoginRegistreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegistreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
