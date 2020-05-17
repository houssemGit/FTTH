import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneEligibiliteComponent } from './consulter-zone-eligibilite.component';

describe('ConsulterZoneEligibiliteComponent', () => {
  let component: ConsulterZoneEligibiliteComponent;
  let fixture: ComponentFixture<ConsulterZoneEligibiliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneEligibiliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneEligibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
