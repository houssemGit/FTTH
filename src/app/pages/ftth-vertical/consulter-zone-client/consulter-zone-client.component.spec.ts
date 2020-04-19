import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneClientComponent } from './consulter-zone-client.component';

describe('ConsulterZoneClientComponent', () => {
  let component: ConsulterZoneClientComponent;
  let fixture: ComponentFixture<ConsulterZoneClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
