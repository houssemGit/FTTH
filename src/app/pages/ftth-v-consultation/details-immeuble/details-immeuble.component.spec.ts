import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsImmeubleComponent } from './details-immeuble.component';

describe('DetailsImmeubleComponent', () => {
  let component: DetailsImmeubleComponent;
  let fixture: ComponentFixture<DetailsImmeubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsImmeubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsImmeubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
