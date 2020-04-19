import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterResidenceComponent } from './consulter-residence.component';

describe('ConsulterResidenceComponent', () => {
  let component: ConsulterResidenceComponent;
  let fixture: ComponentFixture<ConsulterResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
