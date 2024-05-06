import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBanComponent } from './alert-ban.component';

describe('AlertBanComponent', () => {
  let component: AlertBanComponent;
  let fixture: ComponentFixture<AlertBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
