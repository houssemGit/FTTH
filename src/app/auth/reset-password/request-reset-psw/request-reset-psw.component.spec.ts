import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetPswComponent } from './request-reset-psw.component';

describe('RequestResetPswComponent', () => {
  let component: RequestResetPswComponent;
  let fixture: ComponentFixture<RequestResetPswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResetPswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResetPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
