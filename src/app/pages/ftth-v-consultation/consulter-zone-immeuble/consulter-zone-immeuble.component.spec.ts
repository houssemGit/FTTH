import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneImmeubleComponent } from './consulter-zone-immeuble.component';

describe('ConsulterZoneImmeubleComponent', () => {
  let component: ConsulterZoneImmeubleComponent;
  let fixture: ComponentFixture<ConsulterZoneImmeubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneImmeubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneImmeubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
