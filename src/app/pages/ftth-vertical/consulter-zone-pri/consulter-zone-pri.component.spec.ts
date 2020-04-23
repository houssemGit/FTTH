import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterZonePriComponent } from './consulter-zone-pri.component';

describe('ConsulterZonePriComponent', () => {
  let component: ConsulterZonePriComponent;
  let fixture: ComponentFixture<ConsulterZonePriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterZonePriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterZonePriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
