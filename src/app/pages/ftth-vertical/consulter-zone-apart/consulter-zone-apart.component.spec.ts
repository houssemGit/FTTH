import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneApartComponent } from './consulter-zone-apart.component';

describe('ConsulterZoneApartComponent', () => {
  let component: ConsulterZoneApartComponent;
  let fixture: ComponentFixture<ConsulterZoneApartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneApartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneApartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
