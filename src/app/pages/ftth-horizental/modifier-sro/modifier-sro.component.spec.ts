import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSroComponent } from './modifier-sro.component';

describe('ModifierSroComponent', () => {
  let component: ModifierSroComponent;
  let fixture: ComponentFixture<ModifierSroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierSroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
