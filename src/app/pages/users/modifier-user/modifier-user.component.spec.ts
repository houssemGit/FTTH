import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierUserComponent } from './modifier-user.component';

describe('ModifierUserComponent', () => {
  let component: ModifierUserComponent;
  let fixture: ComponentFixture<ModifierUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
