import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOltComponent } from './modifier-olt.component';

describe('ModifierOltComponent', () => {
  let component: ModifierOltComponent;
  let fixture: ComponentFixture<ModifierOltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierOltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierOltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
