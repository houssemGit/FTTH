import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererAppartementComponent } from './gerer-appartement.component';

describe('GererAppartementComponent', () => {
  let component: GererAppartementComponent;
  let fixture: ComponentFixture<GererAppartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererAppartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
