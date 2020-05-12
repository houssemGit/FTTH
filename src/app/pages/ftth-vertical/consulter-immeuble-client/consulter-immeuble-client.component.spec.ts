import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterImmeubleClientComponent } from './consulter-immeuble-client.component';

describe('ConsulterImmeubleClientComponent', () => {
  let component: ConsulterImmeubleClientComponent;
  let fixture: ComponentFixture<ConsulterImmeubleClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterImmeubleClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterImmeubleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
