import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPriComponent } from './modifier-pri.component';

describe('ModifierPriComponent', () => {
  let component: ModifierPriComponent;
  let fixture: ComponentFixture<ModifierPriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
