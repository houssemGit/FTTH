import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneImmeubleMonoApartComponent } from './consulter-zone-immeuble-mono-apart.component';

describe('ConsulterZoneImmeubleMonoApartComponent', () => {
  let component: ConsulterZoneImmeubleMonoApartComponent;
  let fixture: ComponentFixture<ConsulterZoneImmeubleMonoApartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneImmeubleMonoApartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneImmeubleMonoApartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
