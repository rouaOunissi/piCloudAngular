import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceUpdateComponent } from './ressource-update.component';

describe('RessourceUpdateComponent', () => {
  let component: RessourceUpdateComponent;
  let fixture: ComponentFixture<RessourceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
