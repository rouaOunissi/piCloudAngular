import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccededComponent } from './succeded.component';

describe('SuccededComponent', () => {
  let component: SuccededComponent;
  let fixture: ComponentFixture<SuccededComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccededComponent]
    });
    fixture = TestBed.createComponent(SuccededComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
