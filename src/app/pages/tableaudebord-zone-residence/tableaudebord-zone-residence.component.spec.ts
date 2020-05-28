import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableaudebordZoneResidenceComponent } from './tableaudebord-zone-residence.component';

describe('TableaudebordZoneResidenceComponent', () => {
  let component: TableaudebordZoneResidenceComponent;
  let fixture: ComponentFixture<TableaudebordZoneResidenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableaudebordZoneResidenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableaudebordZoneResidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
