import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererSroComponent } from './gerer-sro.component';

describe('GererSroComponent', () => {
  let component: GererSroComponent;
  let fixture: ComponentFixture<GererSroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererSroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererSroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
