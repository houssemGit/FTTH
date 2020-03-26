import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutCassetteComponent } from './ajout-cassette.component';

describe('AjoutCassetteComponent', () => {
  let component: AjoutCassetteComponent;
  let fixture: ComponentFixture<AjoutCassetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutCassetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutCassetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
