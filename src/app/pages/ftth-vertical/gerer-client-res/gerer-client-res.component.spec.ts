import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GererClientResComponent } from './gerer-client-res.component';

describe('GererClientResComponent', () => {
  let component: GererClientResComponent;
  let fixture: ComponentFixture<GererClientResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GererClientResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GererClientResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
