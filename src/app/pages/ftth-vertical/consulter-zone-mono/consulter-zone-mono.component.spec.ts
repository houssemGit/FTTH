import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZoneMonoComponent } from './consulter-zone-mono.component';

describe('ConsulterZoneMonoComponent', () => {
  let component: ConsulterZoneMonoComponent;
  let fixture: ComponentFixture<ConsulterZoneMonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZoneMonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZoneMonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
