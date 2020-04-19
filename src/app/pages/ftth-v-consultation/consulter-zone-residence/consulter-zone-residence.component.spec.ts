import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneResidenceComponent } from './consulter-zone-residence.component';

describe('ConsulterZoneResidenceComponent', () => {
  let component: ConsulterZoneResidenceComponent;
  let fixture: ComponentFixture<ConsulterZoneResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
