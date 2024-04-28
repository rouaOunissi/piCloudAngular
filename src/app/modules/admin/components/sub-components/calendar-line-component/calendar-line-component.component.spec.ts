import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLineComponentComponent } from './calendar-line-component.component';

describe('CalendarLineComponentComponent', () => {
  let component: CalendarLineComponentComponent;
  let fixture: ComponentFixture<CalendarLineComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarLineComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarLineComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
