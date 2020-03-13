import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSroComponent } from './ajout-sro.component';

describe('AjoutSroComponent', () => {
  let component: AjoutSroComponent;
  let fixture: ComponentFixture<AjoutSroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
