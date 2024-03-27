import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationFormsComponent } from './validation-forms.component';

describe('ValidationFormsComponent', () => {
  let component: ValidationFormsComponent;
  let fixture: ComponentFixture<ValidationFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
