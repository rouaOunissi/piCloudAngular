import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatProjectComponent } from './stat-project.component';

describe('StatProjectComponent', () => {
  let component: StatProjectComponent;
  let fixture: ComponentFixture<StatProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
