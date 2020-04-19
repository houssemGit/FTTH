import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierAppartementComponent } from './modifier-appartement.component';

describe('ModifierAppartementComponent', () => {
  let component: ModifierAppartementComponent;
  let fixture: ComponentFixture<ModifierAppartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierAppartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
