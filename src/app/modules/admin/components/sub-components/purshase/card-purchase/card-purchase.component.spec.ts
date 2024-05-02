import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPurchaseComponent } from './card-purchase.component';

describe('CardPurchaseComponent', () => {
  let component: CardPurchaseComponent;
  let fixture: ComponentFixture<CardPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
