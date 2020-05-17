import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEligibiliteComponent } from './details-eligibilite.component';

describe('DetailsEligibiliteComponent', () => {
  let component: DetailsEligibiliteComponent;
  let fixture: ComponentFixture<DetailsEligibiliteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEligibiliteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEligibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
