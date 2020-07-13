import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEligibiliteAppartementComponent } from './details-eligibilite-appartement.component';

describe('DetailsEligibiliteAppartementComponent', () => {
  let component: DetailsEligibiliteAppartementComponent;
  let fixture: ComponentFixture<DetailsEligibiliteAppartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEligibiliteAppartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEligibiliteAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
