import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPriComponent } from './ajout-pri.component';

describe('AjoutPriComponent', () => {
  let component: AjoutPriComponent;
  let fixture: ComponentFixture<AjoutPriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
