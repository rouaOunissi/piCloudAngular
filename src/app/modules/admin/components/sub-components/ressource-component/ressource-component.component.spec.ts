import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceComponentComponent } from './ressource-component.component';

describe('RessourceComponentComponent', () => {
  let component: RessourceComponentComponent;
  let fixture: ComponentFixture<RessourceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourceComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
