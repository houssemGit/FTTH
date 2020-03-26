import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSplitterComponent } from './ajout-splitter.component';

describe('AjoutSplitterComponent', () => {
  let component: AjoutSplitterComponent;
  let fixture: ComponentFixture<AjoutSplitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSplitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
