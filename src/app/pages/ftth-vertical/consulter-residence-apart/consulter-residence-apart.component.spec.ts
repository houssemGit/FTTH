import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterResidenceApartComponent } from './consulter-residence-apart.component';

describe('ConsulterResidenceApartComponent', () => {
  let component: ConsulterResidenceApartComponent;
  let fixture: ComponentFixture<ConsulterResidenceApartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterResidenceApartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterResidenceApartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
