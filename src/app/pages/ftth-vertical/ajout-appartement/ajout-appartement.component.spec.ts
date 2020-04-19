import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAppartementComponent } from './ajout-appartement.component';

describe('AjoutAppartementComponent', () => {
  let component: AjoutAppartementComponent;
  let fixture: ComponentFixture<AjoutAppartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutAppartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
