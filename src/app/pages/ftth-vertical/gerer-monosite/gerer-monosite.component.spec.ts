import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererMonositeComponent } from './gerer-monosite.component';

describe('GererMonositeComponent', () => {
  let component: GererMonositeComponent;
  let fixture: ComponentFixture<GererMonositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererMonositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererMonositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
