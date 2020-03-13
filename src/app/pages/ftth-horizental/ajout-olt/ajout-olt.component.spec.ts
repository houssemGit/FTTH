import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutOltComponent } from './ajout-olt.component';

describe('AjoutOltComponent', () => {
  let component: AjoutOltComponent;
  let fixture: ComponentFixture<AjoutOltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutOltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutOltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
