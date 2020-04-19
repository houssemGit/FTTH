import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMonositeComponent } from './ajout-monosite.component';

describe('AjoutMonositeComponent', () => {
  let component: AjoutMonositeComponent;
  let fixture: ComponentFixture<AjoutMonositeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMonositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutMonositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
