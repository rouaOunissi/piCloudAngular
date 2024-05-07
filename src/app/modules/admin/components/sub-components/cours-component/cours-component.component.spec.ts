import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursComponentComponent } from './cours-component.component';

describe('CoursComponentComponent', () => {
  let component: CoursComponentComponent;
  let fixture: ComponentFixture<CoursComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
