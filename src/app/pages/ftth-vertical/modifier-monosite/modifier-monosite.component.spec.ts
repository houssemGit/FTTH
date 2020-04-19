import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMonositeComponent } from './modifier-monosite.component';

describe('ModifierMonositeComponent', () => {
  let component: ModifierMonositeComponent;
  let fixture: ComponentFixture<ModifierMonositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierMonositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMonositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
