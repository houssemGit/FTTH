import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererPriComponent } from './gerer-pri.component';

describe('GererPriComponent', () => {
  let component: GererPriComponent;
  let fixture: ComponentFixture<GererPriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererPriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererPriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
