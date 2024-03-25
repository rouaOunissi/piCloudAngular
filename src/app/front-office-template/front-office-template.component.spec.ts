import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontOfficeTemplateComponent } from './front-office-template.component';

describe('FrontOfficeTemplateComponent', () => {
  let component: FrontOfficeTemplateComponent;
  let fixture: ComponentFixture<FrontOfficeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontOfficeTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontOfficeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
