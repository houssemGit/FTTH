import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererOltComponent } from './gerer-olt.component';

describe('GererOltComponent', () => {
  let component: GererOltComponent;
  let fixture: ComponentFixture<GererOltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererOltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererOltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
