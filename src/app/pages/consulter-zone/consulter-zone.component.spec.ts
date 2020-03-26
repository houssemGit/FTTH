import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneComponent } from './consulter-zone.component';

describe('ConsulterZoneComponent', () => {
  let component: ConsulterZoneComponent;
  let fixture: ComponentFixture<ConsulterZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
